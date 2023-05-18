import $api from '../http'
import { AxiosResponse } from 'axios'
import { IAuthResponse } from '../types/types'
import { ISignupFormFields } from '../store/types'

export default class AuthService {
  static async signin(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/signin', {email, password})
  }
  
  static async signup(formFields: ISignupFormFields): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/signup', { ...formFields })
  }
  
  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}