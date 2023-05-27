export interface ISignupFormFields {
  email: string
  password: string
  name: string
  phone: string
  location?: string
  occupation?: string[]
  settings?: object
}

export interface IUserNotification {
  title: string
  details?: string
  isViewed: boolean
}
