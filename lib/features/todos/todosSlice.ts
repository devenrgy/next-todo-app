import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'
import { loadLocalStorage } from '@/lib/utils'

export interface Todo {
  id: string
  completed: boolean
  value: string
}

export interface TodosState {
  todos: Todo[]
  reverse: boolean
}

const initialState: TodosState = {
  todos: loadLocalStorage() ?? [],
  reverse: false,
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      if (!action.payload.value) return

      if (!state.reverse) {
        state.todos.push(action.payload)
      } else {
        state.todos.unshift(action.payload)
      }
    },
    removeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },

    reverseTodos: state => {
      state.reverse = !state.reverse
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

export const { addTodo, removeTodo, completeTodo, clearCompletedTodos, reverseTodos } = todosSlice.actions

export const filterTodos = (state: RootState, type?: string) => {
  const { todos } = state.todos
  switch (type) {
    case 'all':
      return todos
    case 'active':
      return todos.filter(todo => !todo.completed)
    case 'completed':
      return todos.filter(todo => todo.completed)

    default:
      throw new Error('Wrong sort type')
  }
}

export default todosSlice.reducer
