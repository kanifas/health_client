export interface IUserSettings {
  allowChangeAnotherCalendar?: boolean
  slotSize?: number
  workDayFrom?: string
  workDayTo?: string
}

export interface IUser {
  id: string
  name: string
  nickname: string
  email: string
  location: string
  phone: string
  role: number
  speciality: {
    id: string,
    name: string,
  }
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

export interface ISpeciality {
  id: string
  name: string
}