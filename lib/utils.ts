import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Todo } from './features/todos/todosSlice'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveLocalStorage(todos: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

export function loadLocalStorage() {
  const data = localStorage.getItem('todos')

  if (data) {
    return JSON.parse(data)
  }
}
