import React, { FC, useState, useCallback, useEffect } from 'react'
import type { RadioChangeEvent } from 'antd'
import { Button, Modal, Table, Typography, Radio } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/store'
import { getShortRoleName } from '../../utils/user/user'

const Role: FC<{id: string, role: number}> = ({id, role}) => {
  const { userStore } = useStore()
  const [value, setValue] = useState(role)
  const options = [
    { label: getShortRoleName(1), value: 1 },
    { label: getShortRoleName(2), value: 2 },
    { label: getShortRoleName(3), value: 3 },
  ]

  const onChange = useCallback(async ({ target: { value } }: RadioChangeEvent) => {
    await userStore.updateUser({id, role: value})
    setValue(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, value])

  return (
    <Radio.Group
      size="small"
      options={options}
      onChange={onChange}
      value={value}
      optionType="button"
      buttonStyle="solid"
    />
  )
}

const ConfigureUsersModal: FC = () => {
  const { userStore } = useStore()

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

  if (userStore.users.length === 0) {
    return null
  }

  const dataSource = userStore.users.map(({ id, name, email, location, role, speciality }) => {
    return {
      key: email,
      name,
      email,
      location: location || '-',
      role: (<Role id={id} role={role} />),
      // speciality: speciality.name || '-',
      speciality: '-',
      allowed: '+',
      actions: (<Typography.Link onClick={() => deleteUser(id, name)}>Удалить</Typography.Link>)
    }
  })

  const columns = [
    {title: 'Имя', dataIndex: 'name', key: 'name'},
    {title: 'Email', dataIndex: 'email', key: 'email'},
    {title: 'Место', dataIndex: 'location', key: 'location'},
    {title: 'Права', dataIndex: 'role', key: 'role'},
    {title: 'Тип', dataIndex: 'speciality', key: 'speciality'},
    {title: 'Разрешено', dataIndex: 'allowed', key: 'allowed'},
    {title: 'Действия', dataIndex: 'actions', key: 'actions'},
  ];
  
  return (
    <Modal
      title="Управление пользователями"
      open={userStore.isShowConfigureUsersModal}
      onOk={() => userStore.isShowConfigureUsersModal = false}
      onCancel={() => userStore.isShowConfigureUsersModal = false}
      width={'90vw'}
      style={{top: '5vh'}}
      footer={[
        <Button type="primary">Добавить пользователя</Button>
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

export default observer(ConfigureUsersModal)