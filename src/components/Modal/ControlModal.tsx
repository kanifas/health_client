import React, {
  FC,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { Modal, Tabs } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'
import AddUser from './ControlModalAddUser'
import Users from './ControlModalUsers'
import * as S from './Modal.styles'
import { roles } from '../../utils/constants'


const ControlModal: FC = () => {
  const { userStore, occupationStore } = useStore()

  useEffect(() => {
    userStore.fetchUsers()
    occupationStore.fetchOccupations()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const nandleSaveNewUser = () => {
    
  }

  const handleOk = () => {
    userStore.closeConfigureUserModal()
  }

  const handleCancel = () => {
    userStore.closeConfigureUserModal()
  }
  
  let content = <Tabs
    centered
    defaultActiveKey="2"
    items={[
      {
        label: (<span>Пользователи</span>),
        key: 'users',
        children: <Users />,
      },
      {
        label: (<span>Добавить пользователя</span>),
        key: 'add',
        children: <AddUser onSave={nandleSaveNewUser} />,
      }
    ]}
  />

  return (
    <Modal
      open={userStore.isShowConfigureUsersModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={'90vw'}
      style={{top:'5vh'}}
      footer={[
        // <Button type="primary" onClick={addUser}>Добавить пользователя</Button>
      ]}
    >
      <br/>
      {content}
    </Modal>
  )
}

export default observer(ControlModal)