import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'

export interface Todo {
  id: string
  completed: boolean
  value: string
}

export interface TodosState {
  todos: Todo[]
  typeSort: 'asc' | 'desc'
}

const initialState: TodosState = {
  todos: [],
  typeSort: 'desc',
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      if (!action.payload.value) return

      if (state.typeSort === 'desc') {
        state.todos.push(action.payload)
      } else {
        state.todos.unshift(action.payload)
      }
    },
    removeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    sortTodos: state => {
      if (state.typeSort === 'desc') {
        state.typeSort = 'asc'
      } else {
        state.typeSort = 'desc'
      }
      state.todos = state.todos.reverse()
    },
    clearCompletedTodos: state => {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    completeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo,
      )
    },
  },
})

export const { addTodo, removeTodo, completeTodo, clearCompletedTodos, sortTodos } = todosSlice.actions

export const selectCount = (state: RootState) => state.todos

export default todosSlice.reducer
