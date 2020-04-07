import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"
import TokenAssistant from '../components/tokenassistant'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TokenAssistant debug="true" issuer="https://iss.example.com/~" clientId="assisted-token-example" />
  </Layout>
)

export default IndexPage
