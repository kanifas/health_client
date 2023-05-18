import { makeAutoObservable } from 'mobx'
import axios, { AxiosError } from 'axios'
import SpecialityService from '../services/SpecialityService'
import { API_URL } from '../http'
import { ISpeciality } from '../types/types'

export default class SpecialityStore {
  specialities = [] as ISpeciality[]

  constructor() {
    makeAutoObservable(this)
  }

  async createSpeciality(name: string) {
    try {
      const response = await SpecialityService.createSpeciality(name)
      console.log('createSpeciality response', response)
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }

  async updateSpeciality(id: string, name: string) {
    try {
      const response = await SpecialityService.updateSpeciality(id, name)
      console.log('updateSpeciality response', response)
      //this.setAuth(true)
      //this.setUser(user)
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }

  async deleteSpeciality(id: string) {
    try {
      const response = await SpecialityService.deleteSpeciality(id)
      console.log('deleteSpeciality response', response)
      //this.setUser({} as IUser)
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }


  async fetchSpecialities() {
    try {
      const response = await SpecialityService.fetchSpecialities()
      this.specialities = response.data
    } catch (err: any) {
      // if (axios.isAxiosError(err))  {
      // } else {
      // }
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }
}