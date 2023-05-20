import React, { FC, ReactNode } from 'react'
import * as S from './Footer.styles'
import { Block } from '..'

interface IProps {
  children?: ReactNode
}

const Footer: FC<IProps> = () => {
  return (
    <S.Footer>
      <Block flex align="center" justify="center" width="100%" height="100%">
        Ant Design ©2023 Created by Ant UED
      </Block>
    </S.Footer>
  )
}

export default Footer