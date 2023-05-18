import React, { FC, useCallback, useState, BaseSyntheticEvent } from 'react'
import { Button, Form, Input, Space, Typography, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/store'
import * as S from './Auth.styles'

interface IFormData {
  name: string
  email: string
  password: string
  phone: string
  location?: string
  speciality?: string
}

const AuthForm: FC = () => {
  const { userStore } = useStore()
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    speciality: '',
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formType, setFormType] = useState<string>('signin')

  const handleInputChange = (event: BaseSyntheticEvent) => {
    const { target } = event
    const { name, value } = target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const siginClick = useCallback(async () => {
    const { email, password } = formData

    if (formType !== 'signin') {
      setFormType('signin')
      setErrorMessage(null)
      return
    }

    if (!email || !password) {
      setErrorMessage('Email и пароль обязательны для заполнения')
      return
    }

    const result = await userStore.signin(email, password)
    if (result instanceof Error) {
      setErrorMessage(result.message)
    } else {
      setErrorMessage(null)
    }
  }, [formData, formType])


  const sigupClick = useCallback(async () => {
    if (formType !== 'signup') {
      setFormType('signup')
      setErrorMessage(null)
      return
    }

    const { name, email, password, phone } = formData
    if (!email || !password || !name || !phone) {
      setErrorMessage('Заполните все обязательные поля')
      return
    }

    const result = await userStore.signup({...formData})

    if (result instanceof Error) {
      setErrorMessage(result.message)
    } else {
      setErrorMessage(null)
    }
  }, [formData, formType])


  const { name, email, password, phone, location, speciality } = formData
  
  return (
    <S.Background>
      <S.Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600, paddingTop: 20 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        colon={false}
        formtype={formType}
        onChange={() => setErrorMessage(null)}
      >
        <div className="signin">
          <Typography.Title level={4} style={{marginTop: 0, textAlign: 'center'}}>Вход</Typography.Title>
          <br/>
          <Form.Item label="Почта" name="email" required>
            <Input id="signinEmail" placeholder="Email" name="email" type="email" onChange={handleInputChange} value={email} />
          </Form.Item>
          <Form.Item label="Пароль" required>
            <Input.Password id="signinPassword" name="password" placeholder="Не менее 3 символов" onChange={handleInputChange} value={password} />
          </Form.Item>
        </div>
        
        <div className="signup">
          <Typography.Title level={4} style={{marginTop: 0, textAlign: 'center'}}>Регистрация</Typography.Title>
          <br/>
          <Form.Item label="Имя" required>
            <Input placeholder="Полное имя" name="name" onChange={handleInputChange} value={name} />
          </Form.Item>
          <Form.Item label="Почта" required>
            <Input placeholder="Email" name="email" type="email" onChange={handleInputChange} value={email} />
          </Form.Item>
          <Form.Item label="Пароль" required>
            <Input.Password placeholder="Не менее 3 символов" name="password" onChange={handleInputChange} value={password} />
          </Form.Item>
          <Form.Item label="Телефон" required>
            <Input placeholder="Телефон" name="phone" onChange={handleInputChange} value={phone} />
          </Form.Item>
          <Form.Item label="Расположение">
            <Input
              placeholder="Отделение, этаж, комната и т.д."
              name="location"
              onChange={handleInputChange}
              value={location}
              suffix={
                <Tooltip title="Можно заполнить позже. Если Вы не принимаете пациентов (например, вы только администрируете), то заполнять не надо, иначе для вас будет создано расписание!">
                  <InfoCircleOutlined style={{ color: 'orange' }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item label="Специализация">
            <Input
              placeholder="Хирург, терапевт и т.д."
              name="speciality"
              onChange={handleInputChange}
              value={speciality}
              suffix={
                <Tooltip title="Можно заполнить позже. Если Вы не принимаете пациентов (например, вы только администрируете), то заполнять не надо, иначе для вас будет создано расписание!">
                  <InfoCircleOutlined style={{ color: 'orange' }} />
                </Tooltip>
              }
            />
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
            <Button type={formType === 'signin' ? 'primary' : 'text'} onClick={siginClick}>Вход</Button>
            <Button type={formType === 'signup' ? 'primary' : 'text'} onClick={sigupClick}>Регистрация</Button>
          </Space>

          {errorMessage && (
            <>
              <br/>
              <Typography.Text type="danger">{errorMessage}</Typography.Text>
            </>
          )}
        </Form.Item>
      </S.Form>
    </S.Background>
  )
}

export default observer(AuthForm)
