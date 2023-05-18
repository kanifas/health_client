import $api from '../http'
import { AxiosResponse } from 'axios'
import { IUser } from '../types/types'

export default class UserService {
  static async deleteUser(id: string): Promise<AxiosResponse<IUser>> {
     return $api.post<IUser>('/user/delete', {id})
  }

  static async updateUser(body: object): Promise<AxiosResponse<IUser>> {
     return $api.post<IUser>('/user/update', body)
  }

  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users')
  }
}