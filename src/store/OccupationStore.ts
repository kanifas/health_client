import { makeAutoObservable } from 'mobx'
import axios, { AxiosError } from 'axios'
import OccupationService from '../services/OccupationService'
import { API_URL } from '../http'
import { IOccupation } from '../types/types'

export default class OccupationStore {
  occupations = [] as IOccupation[]

  constructor() {
    makeAutoObservable(this)
  }

  setOccupations(occupations: IOccupation[]) {
    this.occupations = occupations
  }

  async createOccupation(name: string) {
    try {
      return await OccupationService.createOccupation(name)
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }

  // async updateOccupation(id: string, name: string) {
  //   try {
  //     const response = await OccupationService.updateOccupation(id, name)
  //     console.log('updateOccupation response', response)
  //     //this.setAuth(true)
  //     //this.setUser(user)
  //   } catch (err: any) {
  //     console.log(err.response?.data?.message)
  //     return new Error(err.response?.data?.message)
  //   }
  // }

  async deleteOccupation(id: string) {
    try {
      return await OccupationService.deleteOccupation(id)
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }


  async fetchOccupations() {
    try {
      const occupations = await OccupationService.fetchOccupations()
      this.setOccupations(occupations.data)
      return occupations
    } catch (err: any) {
      // if (axios.isAxiosError(err))  {
      // } else {
      // }
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }
}