import { makeAutoObservable } from "mobx";
import axios from 'axios'
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import { API_URL } from "../http";

export default class Store {
  user = {} as IUser
  isAuth = false
  isCheckingAuthProcess = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  async signup(email: string, password: string) {
    try {
      const response = await AuthService.signup(email, password)
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
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
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
}