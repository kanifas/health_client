import $api from '../http'
import { AxiosResponse } from 'axios'
import { IOccupation } from '../types/types'

export default class OccupationService {
  static async createOccupation(name: string): Promise<AxiosResponse> {
    return $api.post<IOccupation>('/occupation/create', { name })
  }
  
  // static async updateOccupation(id: string, name: string): Promise<AxiosResponse> {
  //   return $api.post<IOccupation>('/occupation/update', { id, name })
  // }

  static async deleteOccupation(id: string): Promise<AxiosResponse> {
    return $api.post<IOccupation>('/occupation/delete', { id })
  }
  
  static async fetchOccupations(): Promise<AxiosResponse<IOccupation[]>> {
    return $api.get<IOccupation[]>('/occupations')
  }
}