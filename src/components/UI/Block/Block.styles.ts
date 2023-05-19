import styled from 'styled-components'
// import { HTMLAttributes } from 'react'
import { IStyledBlockProps } from './types'

// interface IProps extends HTMLAttributes<HTMLDivElement> {
//   fullWidth?: boolean;
//   color?: 'primary' | 'secondary' | 'default'
// }

// interface IHTMLAttributes extends HTMLAttributes<HTMLDivElement> {}

export const Block = styled.div<IStyledBlockProps>`
  box-sizing: border-box;
  padding: var(--block-padding-top) var(--block-padding-right) var(--block-padding-bottom) var(--block-padding-left);
  display: ${({flex}) => flex ? 'flex' : 'block'};
  align-items: ${({align}) => align};
  justify-content: ${({justify}) => justify};
  height: ${({height}) => {
    if (!height) return 'auto'
    if (typeof height === 'number') {
      return `${height}px`
    }
    return height
  }};
  width: ${({width}) => {
    if (!width) return 'auto'
    if (typeof width === 'number') {
      return `${width}px`
    }
    return width
  }};  
`
