export interface IUserSettings {
  allowChangeAnotherCalendar?: boolean
  slotSize?: number
  workDayFrom?: string
  workDayTo?: string
}

export interface IUser {
  id: string
  name: string
  email: string
  phone: string
  role: number
  location?: string
  photo?: string
  occupation?: IOccupation[]
  isEmailConfirmed: boolean
  settings: IUserSettings
}

export interface IAuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}

export interface IAuthError extends Error {
  status: number
  errors: any[]
}

export interface IOccupation {
  id: string
  name: string
}
