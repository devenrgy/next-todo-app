import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'

export interface Todo {
  id: string
  completed: boolean
  value: string
}

export interface TodosState {
  todos: Todo[]
}

const initialState: TodosState = {
  todos: [],
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    completeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo,
      )
    },
  },
})

export const { addTodo, removeTodo, completeTodo } = todosSlice.actions

export const selectCount = (state: RootState) => state.todos

export default todosSlice.reducer
