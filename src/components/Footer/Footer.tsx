import React, { FC, ReactNode } from 'react'
import * as S from './Footer.styles'
import Block from '../UI/Block'

interface IProps {
  children?: ReactNode
}

const Footer: FC<IProps> = () => {
  return (
    <S.Footer>
      <Block>
        Footer
      </Block>
    </S.Footer>
  )
}

export default Footer