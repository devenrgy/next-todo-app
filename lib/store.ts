import todosSlice, { TodosState } from '@/lib/features/todos/todosSlice'
import { configureStore } from '@reduxjs/toolkit'
import { listenerMiddleware } from './middleware'

const todos: TodosState = JSON.parse(localStorage.getItem('todos') || 'undefined')
export const store = () => {
  return configureStore({
    preloadedState: {
      todos: {
        ...todos,
      },
    },
    reducer: {
      todos: todosSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(listenerMiddleware.middleware),
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
