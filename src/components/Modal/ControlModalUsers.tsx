import React, { FC, useState, useCallback } from 'react'
import { Typography, Table } from 'antd'
import { observer } from 'mobx-react-lite'
import Role from './ControlModalRole'
import Occupation from './ControlModalOccupation'
import { useStore } from '../../store'
import * as S from './Modal.styles'

interface IProps {
  onSave?: () => void
}

const ControlModalUsers: FC<IProps> = ({onSave}) => {
  const { userStore } = useStore()

  const deleteUser = useCallback(async (id: string, name: string) => {
    const shure = window.confirm(`Подтвердите удаление ${name}`)
    if (!shure) return;
    await userStore.deleteUser(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handleRoleChange = async (userId: string, role: number) => {
    await userStore.updateUser({id: userId, role})
  }

  const handleOccupationChange = async (userId: string, occupation: string[]) => {
    await userStore.updateUser({id: userId,  occupation})
  }

  if (userStore.users.length === 0) {
    return null
  }

  const columns = [
    {title: 'Имя', dataIndex: 'name', key: 'name'},
    {title: 'Email', dataIndex: 'email', key: 'email'},
    {title: 'Телефон', dataIndex: 'phone', key: 'phone'},
    {title: 'Место', dataIndex: 'location', key: 'location'},
    {title: 'Роль', dataIndex: 'role', key: 'role'},
    {title: 'Профессия', dataIndex: 'occupation', key: 'occupation'},
    {title: 'Действия', dataIndex: 'actions', key: 'actions'},
  ];

  const dataSource = userStore.users.map(({ id, name, email, phone, location, role, occupation }) => {
    return {
      key: id,
      name: name,
      email: email,
      phone: phone,
      location: location || <S.None />,
      role: <Role role={role} onChange={(r) => handleRoleChange(id, r)} />,
      occupation: <Occupation selectedOccupations={occupation} onChange={ids => handleOccupationChange(id, ids)} />,
      actions: (<Typography.Link onClick={() => deleteUser(id, name)}>Удалить</Typography.Link>)
    }
  })
  
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  )
}

export default observer(ControlModalUsers)