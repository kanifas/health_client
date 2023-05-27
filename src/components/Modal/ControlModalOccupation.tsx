import React, { FC } from 'react'
import { AxiosResponse } from 'axios'
import type { SelectProps } from 'antd'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'
import { IOccupationProps } from './types'
import { IOccupation } from '../../types/types'

const ControlModalOccupation: FC<IOccupationProps> = ({
  selectedOccupations = [],
  onChange
}) => {
  const { occupationStore } = useStore()
  // Все существующие в базе
  const options = occupationStore.occupations.map(oc => ({
    value: oc.id,
    label: oc.name
  }))

  // Присвоенные пользователю (выбранные им)
  const defaultValue = selectedOccupations.map(oc => oc.name)

  // Необходимое поведение - если добавили не существующую проыессию,
  // то ее надо добавить в бд 
  // Поскольку в БД occupation пользователя это массив ObjectId,
  // то работаем с айдишками и именами (пример выше const options = ...)
  // Но antd select работает так, что по добавлению не существующего названия
  // в value (см ниже handleChange) может оаказаться, как существующие id, так и названия несуществующих
  // А также в exhaustive (список объектов {label, value}) могут оказаться пустые объекты
  // для несуществующих названий
  // Поэтому делаю следующим образом:
  // На изменение селекта отделяю существующие (список id) от несуществующих (пустые объекты)
  // Далее для несуществующих создаю их в БД и вытаскиваю из ответа на create id-шки
  // В конце концов собираю вместе все айдишки и передаю их в onChange из пропсов
  // Снаружи переданная в onChange функция обновит юзеру список id occupation
  // Для наглядности, пример с тремя значениями:
  // value: ['ds6f6g87f6d8g68', 'новый1', 'новый2']
  // exhaustive: [
  //    {value: 'ds6f6g87f6d8g68', label: 'хирург'},
  //    { },
  //    { }
  // ]  

  const handleChange = async (value: string[], exhaustive: any) => {
    const existingValues: string[] = []
    const notExistingValues: string[] = []

    value.forEach((item, index) => {
      if (!exhaustive[index].label) {
        notExistingValues.push(item) // новые названия
        // createOccupationPromises.push(occupationStore.createOccupation(item))
      } else {
        existingValues.push(item) // айдишки
      }
    })
     
    const resultValues = [...existingValues]
    
    for (const name of notExistingValues) {
      try {
        const response: AxiosResponse<IOccupation> | Error = await occupationStore.createOccupation(name)
        if (!(response instanceof Error)) {
          resultValues.push(response.data.id)
        }        
      } catch (error) {
        // noop
      }      
    }

    if (onChange) {
      await onChange(resultValues)
    }
  }

  return (
    <Select
      mode="tags"
      style={{width: 170}}
      placeholder="Профессия"
      onChange={handleChange}
      options={options}
      defaultValue={defaultValue}
    />
  )
}

export default observer(ControlModalOccupation)
