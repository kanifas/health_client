import { createContext, useContext } from 'react'
import UserStore from './UserStore'
import SpecialityStore from './SpecialityStore'
import CalendarStore from './CalendarStore'

const store = {
  userStore: new UserStore(),
  specialityStore: new SpecialityStore(),
  calendarStore: new CalendarStore(),
};

export const StoreContext = createContext(store)

export const useStore = () => {
  return useContext<typeof store>(StoreContext)
};

export default store
