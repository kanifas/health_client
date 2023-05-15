import React, { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Modal: FC<IProps> = () => {
  return (
    <div>Modal</div>
  )
}

export default Modal