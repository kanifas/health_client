import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Dropdown, Button, Typography, Space, Avatar, Badge } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons'
import { useStore } from '../../store/store'
import { roles } from '../../utils/constants'
import { getRoleName } from '../../utils/user/user'

const Header: FC = () => {
  const { userStore } = useStore()
  const { name, role, speciality } = userStore.user
  
  const items: MenuProps['items'] = [
    {key: 'slots', label: (<div>Записи пациентов</div>)},
    {key: 'settings', label: (<div>Настройки</div>)},
    {type: 'divider'},
    {key: 'logout', label: (<Button type="link" onClick={() => userStore.logout()} icon={<LogoutOutlined />}>Выйти</Button>)},
  ];

  if (role === roles.SUPER || role === roles.ADMIN) {
    items.unshift({
      label: (<div>Управление пользователями</div>),
      key: 'configure users',
      onClick: (e) => userStore.isShowConfigureUsersModal = true
    })
  }

  return (
    <Space size="middle">
      {/* {`${getRoleName(role)} ${speciality.name ? `(${speciality.name})` : ''}`} */}
      {`${getRoleName(userStore.user.role)}`}

      <Dropdown menu={{ items }}>
        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Typography.Link style={{paddingBottom: 10}}>
          <Space>
            <Badge count={0} size="small">
              <Avatar size="small" icon={<UserOutlined />} />
            </Badge>
            {name}
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </Space>
  )
}

export default observer(Header)
