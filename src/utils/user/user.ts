import { roles } from '../constants'
import { IUser } from '../../types/types'

export const isSuper = (user: IUser): boolean => user.role === roles.SUPER

export const isAdmin = (user: IUser): boolean => user.role === roles.ADMIN

export const isUser = (user: IUser): boolean => user.role === roles.USER

export const getRoleName = (role: number): string => {
  switch(role) {
    case roles.SUPER: return 'Старший администратор'
    case roles.ADMIN: return 'Администратор'
    default: return 'Специалист'
  }
}

export const getShortRoleName = (role: number): string => {
  switch(role) {
    case roles.SUPER: return 'Root'
    case roles.ADMIN: return 'Admin'
    default: return 'User'
  }
}