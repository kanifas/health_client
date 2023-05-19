import React, { FC, ReactNode } from 'react'
import * as S from './Content.styles'
import Calendar from '../Calendar'

interface IProps {
  children?: ReactNode
}

const Content: FC<IProps> = () => {
  return (
    <S.Content>
      <Calendar />
    </S.Content>
  )
}

export default Content
