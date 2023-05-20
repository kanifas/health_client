import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Auth } from './components'
import { Layout } from './components'
import { LoadingOutlined } from '@ant-design/icons'
import { useStore } from './store'

function App() {
  const { userStore } = useStore()
  const isCheckedAuth = useRef(false)

  if (localStorage.getItem('accessToken') && !isCheckedAuth.current) {
    userStore.checkAuth()
    isCheckedAuth.current = true
  }

  if (userStore.isCheckingAuthProcess) {
    return (
      <div style={{position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -200%)'}}>
        <LoadingOutlined style={{ color: 'green', fontSize: 40 }} />
      </div>
    )
  }

  if (!userStore.isAuth) {
    return <Auth />
  }

  return <Layout />
}

export default observer(App)
