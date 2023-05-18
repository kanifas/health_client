import React, { FC, ReactNode, useState } from 'react'
import Months from './CalendarMonths'
import Slots from './CalendarSlots'

interface IProps {
  children?: ReactNode
}

const Content: FC<IProps> = () => {
  return (
    <>
      <Months />
      <Slots hoursFrom={10} hoursTo={18} minutesFrom={0} minutesTo={0} slotSize={30} />
    </>
  )
}

export default Content
