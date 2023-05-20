import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import * as S from './Header.styles'
import User from './HeaderUser'
import { Block } from '..'
import { useStore } from '../../store'
import { monthNames } from '../../utils/constants'

const Header: FC = () => {
  const { userStore, calendarStore } = useStore()
  const { name, role, speciality } = userStore.user

  return (
    <S.Header>
      <Block flex align="center" height="100%">
        {monthNames[calendarStore.month-1]} {calendarStore.year} год 
        
        <div style={{marginLeft: 'auto'}}>
          <User />
        </div>
      </Block>
    </S.Header>
  )
}

export default observer(Header)
