import React, { FC, useState, useCallback } from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { observer } from 'mobx-react-lite'
import { getShortRoleName } from '../../utils/user/user'
import { IRoleProps } from './types'
import { roles } from '../../utils/constants'

const ControlModalRole: FC<IRoleProps> = ({role, onChange}) => {
  const [value, setValue] = useState(role)
  const options = [
    { label: getShortRoleName(roles.SUPER), value: roles.SUPER },
    { label: getShortRoleName(roles.ADMIN), value: roles.ADMIN },
    { label: getShortRoleName(roles.USER), value: roles.USER },
  ]

  const handleChange = useCallback(async ({target: { value: role }}: RadioChangeEvent) => {
    if (onChange) {
      await onChange(role)
    }
    setValue(role)
  }, [onChange])

  return (
    <Radio.Group
      size="small"
      options={options}
      onChange={handleChange}
      value={value}
      optionType="button"
      buttonStyle="solid"
      style={{whiteSpace:'nowrap'}}
    />
  )
}

export default observer(ControlModalRole)
