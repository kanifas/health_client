import { HTMLAttributes } from 'react'

export interface IStyledBlockProps extends HTMLAttributes<HTMLDivElement> {
  flex?: boolean
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  height?: number | string
}