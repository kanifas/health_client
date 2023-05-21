import React, { FC } from 'react'
import Layout from './Layout.styles'
import { Header, Content, Footer, ControlModal } from '..'

const LayoutComponent: FC = () => {
  return (
    <Layout>
      <Header />
      <Content />
      <Footer />
      <ControlModal />
    </Layout>
  )
}

export default LayoutComponent