'use client'

import { Todo } from './features/todos/todosSlice'

export function saveLocalStorage(todos: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

export function loadLocalStorage() {
  const data = localStorage.getItem('todos')

  if (data) {
    return JSON.parse(data)
  }
}
