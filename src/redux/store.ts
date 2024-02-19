import { configureStore } from '@reduxjs/toolkit'
import sideMenuReducer from './slice/SideMenuSlice'

export const store = configureStore({
  reducer: {
    sideMenu : sideMenuReducer
  }
})

// export type RootState = ReturnType<typeof store.getState>
type GetReturnRtpe<T> = T extends () => infer R ? R : T;
export type RootState = GetReturnRtpe<typeof store.getState>
export type AppDispatch = typeof store.dispatch