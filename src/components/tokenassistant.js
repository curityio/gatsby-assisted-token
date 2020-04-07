import React, { Component } from 'react';
import axios from 'axios';

const { Provider, Consumer } = React.createContext();

class TokenAssistantContextProvider extends Component {
    config = {};
    count = 0;
    tokenAssistant;
    debug = false;
    issuer = undefined;
    clientId = undefined;
    state = {
        isLoggedIn: false,
    };

    constructor(props) {
        super(props);

        this.debug = props.debug === "true" ? true : false;
        this.issuer = props.issuer;
        this.clientId = props.clientId;
        this.scope = props.scope !== undefined ? props.scope : ""

        if (this.issuer === undefined || this.clientId === undefined) {
            throw new Error("Issuer or client_id was not configured");
        }

        this.loadConfiguration();
    }

    render() {
        return (
            <Provider value={{
                isLoggedIn: this.state.isLoggedIn, userName: this.state.userName, accessToken:
                    this.state.accessToken, login: this.getToken, logout: this.logout
            }}>
                {this.props.children}
            </Provider>
        );
    }

    loadConfiguration = () => {
        axios.get(this.issuer + "/.well-known/openid-configuration").then(response => {
            this.config = response.data;
            console.log(response.data);
            this.addScriptToIndexFile();
            this.tryLoadTokenAssistant();
        });
    };


    tryLoadTokenAssistant = () => {
        console.log("Loading assistant..");
        if (window.curity) {
            if (!this.tokenAssistant) {
                this.loadTokenAssistant();
                console.log("DONE");
            }
            console.log("Already loaded");
        }
        else {
            setTimeout(() => {
                this.count++;
                if (this.count > 100) {
                    return false;
                }
                this.tryLoadTokenAssistant();
            }, 20);
        }
    }

    addScriptToIndexFile = () => {
        var head = window.document.head;
        var script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.config.assisted_token_endpoint +
            '/resources/js/assisted-token.js';
        script.id = 'assisted-token-js-script';
        head.appendChild(script);
    }

    loadTokenAssistant = () => {
        if (!window.curity) {
            throw new Error('Assisted token javascript was not found.' +
                ' Make sure the server is running and/or update URL ' +
                'of #assisted-token-js-script script');
        }
        window.curity.debug = this.debug;
        this.tokenAssistant = window.curity.token.assistant({
            clientId: this.clientId,
        });
    }

    getToken = () => {
        if (!this.tokenAssistant) {
            console.error('Token Assistant is undefined.');
            return false;
        }
        this.tokenAssistant.loginIfRequired({ "scope": this.scope }).then((msg) => {
            console.log('Retrieved tokens', msg);
            let additionalData = this.tokenAssistant.getAdditionalData();
            console.log('additional data', additionalData)

            this.setState({ isLoggedIn: true, accessToken: msg.token, userName: additionalData.subject });
        }).fail((err) => {
            console.log('Failed to retrieve tokens', err);
        });
    }

    logout = () => {
        if (!this.tokenAssistant) {
            console.error('Token Assistant is undefined.');
            return false;
        }
        this.tokenAssistant.logout().then(() => {
            this.setState({ accessToken: undefined, userName: undefined, isLoggedIn: false });
        }).fail((err) => {
            console.err("Failed to logout.", err);
        });
    }
}

const StateBox = (props) => {
    return (
        <Consumer>
            {(context) => context.isLoggedIn ? <pre>{context.accessToken}</pre> : ''}
        </Consumer>
    )
}

const Greeting = (props) => {
    return (
        <Consumer>
            {context => context.userName !== undefined ? <h1>Hi {context.userName}</h1> : <h1>Welcome!</h1>}
        </Consumer>
    )
}

const ControlPanel = () => {
    return (
        <Consumer>
            {(context) => {
                const loginButton = !context.isLoggedIn ? <button onClick={context.login}>Login</button> : '';
                const logoutButton = context.isLoggedIn ? <button onClick={context.logout}>Logout</button> : ''
                const getTokenButton = context.isLoggedIn ? <button onClick={context.login}>Get Token</button> : '';
                return (<p>{loginButton} {logoutButton} {getTokenButton}</p>);
            }
            }
        </Consumer>
    )
}

function TokenAssistant(props) {
    return (
        <div className="tokenassistant">
            <TokenAssistantContextProvider debug={props.debug} issuer={props.issuer} clientId={props.clientId} scope={props.scope}>
                <Greeting />
                <ControlPanel />
                <StateBox />
            </TokenAssistantContextProvider>
        </div>);
}

export default TokenAssistant
