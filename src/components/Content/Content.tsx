import React, { FC, ReactNode } from 'react'
import { useStore } from '../../store/store'
import * as S from './Content.styles'
import Block from '../UI/Block'
import Calendar from '../Calendar'

interface IProps {
  children?: ReactNode
}

const Content: FC<IProps> = () => {
  const { userStore } = useStore()

  return (
    <S.Content>
      <Calendar />
    </S.Content>
  )
}

export default Content
