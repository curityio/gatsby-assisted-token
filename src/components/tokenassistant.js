
import React from 'react'
import { TokenAssistantContextConsumer } from './context-provider';

const StateBox = (props) => {
    return (
        <TokenAssistantContextConsumer>
            {(context) => context.isLoggedIn ? <pre>{context.accessToken}</pre> : ''}
        </TokenAssistantContextConsumer>
    )
}

const Greeting = (props) => {
    return (
        <TokenAssistantContextConsumer>
            {context => context.userName !== undefined ? <h1>Hi {context.userName}</h1> : <h1>Welcome!</h1>}
        </TokenAssistantContextConsumer>
    )
}

const ControlPanel = () => {
    return (
        <TokenAssistantContextConsumer>
            {(context) => {
                const loginButton = !context.isLoggedIn ?  <button onClick={context.login}>Login</button> : '';
                const logoutButton = context.isLoggedIn ?  <button onClick={context.logout}>Logout</button> : ''
                const getTokenButton = context.isLoggedIn ?  <button onClick={context.login}>Get Token</button> : '';
                return (<p>{loginButton} {logoutButton} {getTokenButton}</p>);
            }
            }
        </TokenAssistantContextConsumer>
    )
}

function TokenAssistant(props) {
    return (
        <div className="tokenassistant">
            <Greeting />
            <ControlPanel />
            <StateBox />
        </div>
    );
}


export default TokenAssistant
