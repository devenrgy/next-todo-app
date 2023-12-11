import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { RootState } from './store'
import { addTodo, removeTodo, completeTodo, clearCompletedTodos, reverseTodos } from './features/todos/todosSlice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: isAnyOf(addTodo, removeTodo, completeTodo, clearCompletedTodos, reverseTodos),
  effect: (_, listenerApi) =>
    localStorage.setItem('todos', JSON.stringify((listenerApi.getState() as RootState).todos)),
})
