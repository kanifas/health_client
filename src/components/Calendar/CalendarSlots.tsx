import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'
import * as S from './Calendar.styles'

interface IProps {
  hoursFrom: number,
  minutesFrom: number,
  hoursTo: number,
  minutesTo: number,
  slotSize: number
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

const Content: FC<IProps> = ({ hoursFrom, hoursTo, minutesFrom, minutesTo, slotSize }) => {
  const { calendarStore } = useStore()
  const hoursPerDay = hoursTo - hoursFrom
  const slotsPerHour = 60 / slotSize
  const slotsPerDay = slotsPerHour * hoursPerDay + 1

  let stepH = hoursFrom
  let stepM = minutesFrom
  const times = Array(slotsPerDay).fill(1).map((_, index) => {
    if (index === 0) {
      return <S.Th>{`${stepH}:${stepM < 9 ? stepM + '0' : stepM}`}</S.Th>
    }
    
    stepM += slotSize
    if (stepM >= 60) {
      stepH += 1
      stepM = 0
    }

    return <S.Th>{`${stepH}:${stepM < 9 ? stepM + '0' : stepM}`}</S.Th>    
  })

  const dayInMonth = getDaysInMonth(calendarStore.year, calendarStore.month)

  return (
    <S.Table>
      <S.Thead>
        <S.Tr>
          <S.Th>Часы<br />Дни</S.Th>
          {times}
        </S.Tr>
      </S.Thead>

      <S.Tbody>
        {Array(dayInMonth).fill(1).map((_, day) => {
          return (
            <S.Tr>
              {Array(times.length + 1).fill(1).map((_, index) => {
                if (index === 0) {
                  return <S.Td>{day + 1}</S.Td>
                }
                return <S.Td></S.Td>
              })}
            </S.Tr>
          )
        })}
      </S.Tbody>
    </S.Table>
  )
}

export default observer(Content)
