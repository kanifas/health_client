import { makeAutoObservable } from "mobx"
import axios, { AxiosError } from 'axios'
import AuthService from "../services/AuthService"
import UserService from "../services/UserService"
import { API_URL } from "../http"
import { IUser } from "../types/types"
import { ISignupFormFields, IUserNotification } from './types'

export default class UserStore {
  user = {} as IUser
  users = [] as IUser[]
  isAuth = false
  isCheckingAuthProcess = false
  isShowConfigureUsersModal = false
  isShowSettingsModal = false
  isShowSlotsModal = false
  notifications: IUserNotification[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  async signup(formFields: ISignupFormFields) {
    try {
      const response = await AuthService.signup({ ...formFields })
      const { accessToken, user } = response.data
      localStorage.setItem('accessToken', accessToken)
      this.setAuth(true)
      this.setUser(user)
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }

  async signin(email: string, password: string) {
    try {
      const response = await AuthService.signin(email, password)
      console.log(response)
      const { accessToken, user } = response.data
      localStorage.setItem('accessToken', accessToken)
      this.setAuth(true)
      this.setUser(user)
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout()
      console.log(response)
      localStorage.removeItem('accessToken')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }

  async checkAuth() {
    this.setIsCheckingAuthProcess(true)
    try {
      // Используем дефолтный инстанс аксиоса, чтобы интерцепторы не проделывали лишнюю работы
      const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
      console.log(response)
      const { accessToken, user } = response.data
      localStorage.setItem('accessToken', accessToken)
      this.setAuth(true)
      this.setUser(user)
      console.log(user)
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    } finally {
      this.setIsCheckingAuthProcess(false)
    }
  }

  setIsCheckingAuthProcess(bool: boolean) {
    this.isCheckingAuthProcess = bool
  }

  async deleteUser(id: string) {
    try {
      const response = await UserService.deleteUser(id)
      console.log(response)
      await this.fetchUsers()
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }

  async updateUser(fields: object) {
    try {
      const response = await UserService.updateUser(fields)
      console.log(response)
      await this.fetchUsers()
    } catch (err: any) {
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }

  async fetchUsers() {
    try {
      const response = await UserService.fetchUsers()
      this.users = response.data
    } catch (err: any) {
      // if (axios.isAxiosError(err))  {
      // } else {
      // }
      console.log(err.response?.data?.message)
      return new Error(err.response?.data?.message)
    }
  }
}