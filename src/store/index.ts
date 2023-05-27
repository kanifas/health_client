import { createContext, useContext } from 'react'
import UserStore from './UserStore'
import OccupationStore from './OccupationStore'
import CalendarStore from './CalendarStore'

const store = {
  userStore: new UserStore(),
  occupationStore: new OccupationStore(),
  calendarStore: new CalendarStore(),
};

export const StoreContext = createContext(store)

export const useStore = () => {
  return useContext<typeof store>(StoreContext)
};

export default store
