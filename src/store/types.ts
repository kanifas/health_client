export interface ISignupFormFields {
  email: string
  password: string
  name: string
  phone: string
  location?: string
  speciality?: string
}

export interface IUserNotification {
  title: string
  details?: string
  isViewed: boolean
}
