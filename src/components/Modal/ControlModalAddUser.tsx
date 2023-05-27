import React, { FC, useState, useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'
import Block from '../UI/Block/Block'
import Role from './ControlModalRole'
import { roles } from '../../utils/constants'
import Occupation from './ControlModalOccupation'


interface IProps {
  onSave: () => void
}

const ControlModalAddUser: FC<IProps> = ({onSave}) => {
  const { userStore } = useStore()
  const [role, setRole] = useState(roles.USER)
  const [occupation, setOccupation] = useState<string[]>([])
  
  const onFinish = useCallback((values: any) => {
    values.role = role
    values.occupation = occupation
    console.log('Success:', values)
  }, [role, occupation])
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleRoleChange = async (role: number) => {
    setRole(role)
  }

  const handleOccupationChange = async (oc: string[]) => {
    setOccupation(oc)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 600, margin: '0 auto' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <br />
      <Form.Item
        colon={false}
        label="Имя"
        name="username"
        rules={[{ required: true, message: 'Пожалуйста укажите имя!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        colon={false}
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Пожалуйста укажите Email!' }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        colon={false}
        label="Телефон"
        name="phone"
        rules={[{ required: true, message: 'Пожалуйста укажите телефон!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        colon={false}
        label="Роль"
        name="role"
      >
        <Role role={roles.USER} onChange={handleRoleChange} />
      </Form.Item>

      <Form.Item
        colon={false}
        label="Деятельность"
        name="occupation"
      >
        {/* <Input /> */}
        <Occupation onChange={handleOccupationChange} />,
      </Form.Item>

      <Block flex justify="center">
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Block>
    </Form>
  )
}

export default observer(ControlModalAddUser)