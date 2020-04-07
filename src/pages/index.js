import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { TokenAssistantContextProvider } from '../components/context-provider'
import TokenAssistant from '../components/tokenassistant'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TokenAssistantContextProvider debug="true">
      <TokenAssistant />
    </TokenAssistantContextProvider>
  </Layout>
)

export default IndexPage
