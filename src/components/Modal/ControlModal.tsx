import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  BaseSyntheticEvent,
  FormEvent
} from 'react'
import { Button, Modal, Table, Typography, Input } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'
import { IUser } from '../../types/types'
import Role from './ControlModalRole'
import * as S from './Modal.styles'
import { roles } from '../../utils/constants'


const ControlModal: FC = () => {
  const { userStore } = useStore()
  const [newUser, setNewUser] = useState<IUser | null>(null)

  useEffect(() => {
    userStore.fetchUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteUser = useCallback(async (id: string, name: string) => {
    const shure = window.confirm(`Подтвердите удаление ${name}`)
    if (!shure) return;
    await userStore.deleteUser(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteNewUser = (id: string) => {
    setNewUser(null)
    userStore.deleteNewUser(id)
  }

  const isNewUserFilled = useCallback(() => {
    if (!newUser) return false;
    if (!newUser.name) return false
    if (!newUser.email) return false
    if (newUser.phone.trim().length === 0) return false
    return true
  }, [newUser])  

  const saveNewUser = useCallback(async () => {
    if (!newUser) {
      return
    }
    try {
      await userStore.saveNewUser(newUser)
    } catch (error) {
      console.log(error)
    } finally {
      setNewUser(null)
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser])

  if (userStore.users.length === 0) {
    return null
  }  

  const newUserOnChange = (event: BaseSyntheticEvent<InputEvent, HTMLInputElement, HTMLInputElement>) => {
    const { target } = event
    const { name, value } = target
    
    setNewUser(prevUser => {
      if (!prevUser) {
        return null
      }
      return {
        ...prevUser,
        [name]: value
      }
    })
  }

  const columns = [
    {title: 'Имя', dataIndex: 'name', key: 'name'},
    {title: 'Email', dataIndex: 'email', key: 'email'},
    {title: 'Телефон', dataIndex: 'phone', key: 'phone'},
    {title: 'Место', dataIndex: 'location', key: 'location'},
    {title: 'Роль', dataIndex: 'role', key: 'role'},
    {title: 'Специальность', dataIndex: 'speciality', key: 'speciality'},
    {title: 'Разрешить', dataIndex: 'allowed', key: 'allowed'},
    {title: 'Действия', dataIndex: 'actions', key: 'actions'},
  ];

  const dataSource = userStore.users.map(({ id, name, email, phone, location, role, speciality, isNew }) => {
    if (isNew) {
      return {
        key: id,
        name: <Input name="name" value={newUser?.name} onChange={newUserOnChange} />,
        email: <Input name="email" value={newUser?.email} onChange={newUserOnChange} />,
        phone: <Input name="phone" value={newUser?.phone} onChange={newUserOnChange} />,
        location: <Input name="location" value={newUser?.location} onChange={newUserOnChange} />,
        role: <Role userId={id} role={role} />,
        speciality: <Input name="speciality" value={newUser?.speciality?.name} />,
        allowed: <S.None />,
        actions: (<Typography.Link onClick={() => deleteNewUser(id)}>Удалить</Typography.Link>)
      }
    }
    return {
      key: id,
      name: name,
      email: email,
      phone: phone,
      location: location || <S.None />,
      role: <Role userId={id} role={role} />,
      speciality: speciality?.name || <S.None />,
      allowed: <S.None />,
      actions: (<Typography.Link onClick={() => deleteUser(id, name)}>Удалить</Typography.Link>)
    }
  })

  const addUser = () => {
    const newUser = {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      role: roles.USER,
      isEmailConfirmed: false,
      settings: {},
      isNew: true,
    }
    setNewUser(newUser)
    userStore.addNewUser(newUser)
  }
  
  return (
    <Modal
      title="Управление пользователями"
      open={userStore.isShowConfigureUsersModal}
      onOk={() => userStore.closeConfigureUserModal()}
      onCancel={() => userStore.closeConfigureUserModal()}
      width={'90vw'}
      style={{top:'5vh'}}
      footer={[
        newUser
        ? <Button
            type="primary"
            disabled={!isNewUserFilled()}
            onClick={saveNewUser}
          >
            {!isNewUserFilled() ? 'Заполните обязательные поля' : 'Сохранить'}
          </Button>
        : <Button type="primary" onClick={addUser}>Добавить пользователя</Button>
      ]}
    >
      <br/>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </Modal>
  )
}

export default observer(ControlModal)