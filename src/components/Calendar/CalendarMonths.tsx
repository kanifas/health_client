import React, {FC} from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useStore } from '../../store'


const CalendarMonths: FC = () => {
  const { calendarStore } = useStore()

  const onChange = (month: string) => {
    calendarStore.setMonth(month)
  }

  const tabs: TabsProps['items'] = [
    {key: '1', label: `Январь`, children: ``},
    {key: '2', label: `Февраль`, children: ``},
    {key: '3', label: `Март`, children: ``},
    {key: '4', label: `Апрель`, children: ``},
    {key: '5', label: `Май`, children: ``},
    {key: '6', label: `Июнь`, children: `` },
    {key: '7', label: `Июль`, children: ``},
    {key: '8', label: `Август`, children: ``},
    {key: '9', label: `Сентябрь`, children: ``},
    {key: '10',label: `Октябрь`, children: ``},
    {key: '11',label: `Ноябрь`, children: ``},
    {key: '12',label: `Декабрь`, children: ``},
  ]

  return (
    <Tabs
      centered
      defaultActiveKey={calendarStore.month.toString()}
      items={tabs}
      onChange={onChange}
    />
  )
}

export default CalendarMonths