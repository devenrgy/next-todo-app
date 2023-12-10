'use client'

import { addTodo } from '@/lib/features/todos/todosSlice'
import { v4 as uuidv4 } from 'uuid'
import { Input } from '../ui/input'
import { useAppDispatch } from '@/lib/hooks'
import { KeyboardEvent } from 'react'

export function TodoInput() {
  const dispatch = useAppDispatch()
  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(addTodo({ value: event.currentTarget.value, completed: false, id: uuidv4() }))
      event.currentTarget.value = ''
    }
  }
  return <Input onKeyUp={handleKeyUp} className={'mb-10 h-12 text-base'} placeholder={'Create a new todo...'} />
}
