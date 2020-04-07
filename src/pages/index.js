import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"
import TokenAssistant from '../components/tokenassistant'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TokenAssistant debug="true" issuer="https://dlindau.ngrok.io/~" clientId="assisted-token-example" />
  </Layout>
)

export default IndexPage
