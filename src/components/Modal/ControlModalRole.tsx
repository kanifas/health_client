import React, { FC, useState, useCallback } from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'
import { getShortRoleName } from '../../utils/user/user'
import { IRoleProps } from './types'

const ControlModalRole: FC<IRoleProps> = ({userId, role}) => {
  const { userStore } = useStore()
  const [value, setValue] = useState(role)
  const options = [
    { label: getShortRoleName(1), value: 1 },
    { label: getShortRoleName(2), value: 2 },
    { label: getShortRoleName(3), value: 3 },
  ]

  const onChange = useCallback(async ({ target: { value } }: RadioChangeEvent) => {
    await userStore.updateUser({userId, role: value})
    setValue(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, value])

  return (
    <Radio.Group
      size="small"
      options={options}
      onChange={onChange}
      value={value}
      optionType="button"
      buttonStyle="solid"
      style={{whiteSpace:'nowrap'}}
    />
  )
}

export default observer(ControlModalRole)