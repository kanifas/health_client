import $api from '../http'
import { AxiosResponse } from 'axios'
import { IAuthResponse } from '../models/AuthResponse'

export default class AuthService {
  static async signin(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/signin', {email, password})
  }
  
  static async signup(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/signup', {email, password})
  }
  
  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}