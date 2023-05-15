import React, { FC } from 'react'
import Layout from './Layout.styles'
import Header from '../Header'
import Content from '../Content'
import Footer from '../Footer'

const LayoutComponent: FC = () => {
  return (
    <Layout>
      <Header>
        123 123 123
      </Header>

      <Content />

      <Footer />
    </Layout>
  )
}

export default LayoutComponent