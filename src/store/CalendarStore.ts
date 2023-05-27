import { makeAutoObservable } from 'mobx'

export default class CalendarStore {
  year = new Date().getFullYear()
  month = new Date().getMonth() + 1

  constructor() {
    makeAutoObservable(this)
  }

  setMonth(month: string | number) {
    this.month = Number(month);
  }

  setYear(year: string | number) {
    this.year = Number(year)
  }
}