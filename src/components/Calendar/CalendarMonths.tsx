import React, { FC } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { RemoveTabsMargin } from './Calendar.styles'
import { useStore } from '../../store'

const CalendarMonths: FC = () => {
  const { calendarStore } = useStore()

  const onChange = (month: string) => {
    calendarStore.setMonth(month)
  }

  const tabs: TabsProps['items'] = [
    {key: '1', label: 'Январь'},
    {key: '2', label: 'Февраль'},
    {key: '3', label: 'Март'},
    {key: '4', label: 'Апрель'},
    {key: '5', label: 'Май'},
    {key: '6', label: 'Июнь'},
    {key: '7', label: 'Июль'},
    {key: '8', label: 'Август'},
    {key: '9', label: 'Сентябрь'},
    {key: '10',label: 'Октябрь'},
    {key: '11',label: 'Ноябрь'},
    {key: '12',label: 'Декабрь'},
  ]

  return (
    <RemoveTabsMargin>
      <Tabs
        centered
        defaultActiveKey={calendarStore.month.toString()}
        items={tabs}
        onChange={onChange}
      />
    </RemoveTabsMargin>
  )
}

export default CalendarMonths
