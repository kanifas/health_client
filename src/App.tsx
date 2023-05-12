import React, { useContext, useRef } from 'react';
import AuthForm from './components/AuthForm';
import { Button } from 'antd';
import './App.css';
import { Context } from '.';
import { observer } from 'mobx-react-lite';

function App() {
  const { store } = useContext(Context)
  const isCheckedAuth = useRef(false)

  if (localStorage.getItem('accessToken') && !isCheckedAuth.current) {
    store.checkAuth()
    isCheckedAuth.current = true
  }

  // По рендеру успевает появиться форма авторизации, поэтому вместо эффекта использовал реф (выше)
  // useEffect(() => {
  //   if (localStorage.getItem('accessToken')) {
  //     store.checkAuth()
  //   }
  // }, [])

  if (store.isCheckingAuthProcess) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth) {
    return <AuthForm />
  }

  return (
    <div className="App">
      <h2>{store.isAuth ? 'Авторизован' : 'Не авторизован'}</h2>
      <Button type="primary" onClick={() => store.logout()}>
        Logout
      </Button>
    </div>
  );
}

export default observer(App)
