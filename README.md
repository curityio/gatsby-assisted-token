# Gatsby/React Assisted Token Example

[![Quality](https://img.shields.io/badge/quality-demo-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

This is an example based on https://github.com/curityio/react-assisted-token-website . It demonstrates the use of the Assisted Token Library together GATSBY CLI and the React Context API.

To run in development mode:
`gatsby develop -S`

Configure the client settings in `index.js`

## Client Config
The example uses a client with the following config:

```
<config xmlns="http://tail-f.com/ns/config/1.0">
  <profiles xmlns="https://curity.se/ns/conf/base">
  <profile>
    <id>token-service</id>
    <type xmlns:as="https://curity.se/ns/conf/profile/oauth">as:oauth-service</type>
      <settings>
      <authorization-server xmlns="https://curity.se/ns/conf/profile/oauth">
      <client-store>
      <config-backed>
      <client>
        <id>assisted-token-example</id>
        <redirect-uris>https://localhost:8000</redirect-uris>
        <scope>read</scope>
        <allowed-origins>https://localhost:8000</allowed-origins>
        <capabilities>
          <assisted-token/>
        </capabilities>
      </client>
      </config-backed>
      </client-store>
      </authorization-server>
      </settings>
  </profile>
  </profiles>
</config>
```
