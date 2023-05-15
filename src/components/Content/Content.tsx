import React, { FC, ReactNode } from 'react'
import * as S from './Content.styles'
import Block from '../UI/Block'

interface IProps {
  children?: ReactNode
}

const Content: FC<IProps> = () => {
  return (
    <S.Content>
      <Block>
        Content
        <br/>...
        <br/>...
        <br/>...
        <br/>...
        <br/>...
        <br/>...
      </Block>
    </S.Content>
  )
}

export default Content
