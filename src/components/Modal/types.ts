import { IOccupation } from '../../types/types'

export interface IRoleProps {
  role: number
  onChange?: (role: number) => Promise<any>
}

export interface IOccupationProps {
  onChange?: (occupation: string[]) => Promise<any> | void
  selectedOccupations?: IOccupation[]
}

