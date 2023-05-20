import React, { FC } from 'react'
import Layout from './Layout.styles'
import { Header, Content, Footer, ConfigureUsersModal } from '..'

const LayoutComponent: FC = () => {
  return (
    <Layout>
      <Header />
      <Content />
      <Footer />
      <ConfigureUsersModal />
    </Layout>
  )
}

export default LayoutComponent