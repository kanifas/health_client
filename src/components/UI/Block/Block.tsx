import React, { FC, ReactNode } from 'react'
import * as S from './Block.styles'
import { IStyledBlockProps } from './types'

interface IProps extends IStyledBlockProps {
  children?: ReactNode
}

const Block: FC<IProps> = ({
  children,
  flex,
  align,
  height,
  ...rest
}) => {
  return (
    <S.Block flex={flex} align={align} height={height} {...rest}>
      {children}
    </S.Block>
  )
}

export default Block