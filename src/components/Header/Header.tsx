import React, { FC, ReactNode } from 'react'
import * as S from './Header.styles'
import Block from '../UI/Block'

interface IProps {
  children?: ReactNode
}

const Header: FC<IProps> = () => {
  return (
    <S.Header>
      <Block flex align="center" height="100%">
        Header
      </Block>
    </S.Header>
  )
}

export default Header
