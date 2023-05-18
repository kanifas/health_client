import React, { FC } from 'react'
import Layout from './Layout.styles'
import Header from '../Header'
import Content from '../Content'
import Footer from '../Footer'
import ConfigureUsersModal from '../Modal/ConfigureUsersModal'

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