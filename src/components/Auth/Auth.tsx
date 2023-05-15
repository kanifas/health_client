import React, { FC, useCallback, useContext, useState, ChangeEvent } from 'react'
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { Context } from '../..';
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(60, 100, 68, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledForm = styled(Form)`
  padding: 50px 20px 20px;
  min-width: 500px;
  background: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
`

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const AuthForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {store} = useContext(Context)

  const siginClick = useCallback(async () => {
    const result = await store.signin(email, password)
    if (result instanceof Error) {
      setErrorMessage(result.message)
    } else {
      setErrorMessage(null)
    }
  }, [email, password])

  const sigupClick = useCallback(async () => {
    const result = await store.signup(email, password)
    if (result instanceof Error) {
      setErrorMessage(result.message)
    } else {
      setErrorMessage(null)
    }
  }, [email, password])

  const emailOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null)
    setEmail(e.target.value)
  }

  const passwordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null)
    setPassword(e.target.value)
  }
  
  return (
    <Wrapper>
      <StyledForm
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        colon={false}
      >
        <Form.Item
          label="Почта"
          name="email"
          // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Email" onChange={emailOnChange} value={email} />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          // rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Не менее 3 символов" onChange={passwordOnChange} value={password} />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
            <Button type="primary" onClick={siginClick}>
              Вход
            </Button>

            <Button type="primary" onClick={sigupClick}>
              Регистрация
            </Button>
          </Space>

          {errorMessage && (
            <>
              <br/>
              <Typography.Text type="danger">{errorMessage}</Typography.Text>
            </>
          )}
        </Form.Item>
      </StyledForm>
    </Wrapper>
  )
}

export default observer(AuthForm)
