import todosSlice from '@/lib/features/todos/todosSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = () => {
  return configureStore({
    reducer: {
      todos: todosSlice,
    },
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
