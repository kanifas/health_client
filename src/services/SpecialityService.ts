import $api from '../http'
import { AxiosResponse } from 'axios'
import { ISpeciality } from '../types/types'

export default class SpecialityService {
  //static async createSpeciality(bane: string): Promise<AxiosResponse<IAuthResponse>> {
  static async createSpeciality(name: string): Promise<AxiosResponse> {
    return $api.post<ISpeciality>('/speciality/create', { name })
  }
  
  //static async updateSpeciality(formFields: ISignupFormFields): Promise<AxiosResponse<IAuthResponse>> {
  static async updateSpeciality(id: string, name: string): Promise<AxiosResponse> {
    return $api.post<ISpeciality>('/speciality/update', { id, name })
  }

  //static async deleteSpeciality(formFields: ISignupFormFields): Promise<AxiosResponse<IAuthResponse>> {
  static async deleteSpeciality(id: string): Promise<AxiosResponse> {
    return $api.post<ISpeciality>('/speciality/delete', { id })
  }
  
  static async fetchSpecialities(): Promise<AxiosResponse<ISpeciality[]>> {
    return $api.get<ISpeciality[]>('/specialities')
  }
}