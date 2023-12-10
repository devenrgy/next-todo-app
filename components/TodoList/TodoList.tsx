'use client'

import { Button } from '@/components/ui/button'
import { useAppStore, useAppSelector, useAppDispatch } from '@/lib/hooks'
import { removeTodo, completeTodo } from '@/lib/features/todos/todosSlice'
import { Toggle } from '@/components/ui/toggle'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

export function TodoList() {
  const store = useAppStore()
  const { todos } = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()
  return (
    <>
      <div className={cn('mb-16 overflow-hidden rounded-lg border', !todos.length && 'hidden')}>
        <Table className={'bg-background text-base'}>
          <TableCaption className={'m-0 p-4  text-left'}>
            <div className={'flex flex-wrap items-center justify-center gap-5 sm:justify-between'}>
              <p>{todos.length ? `${todos.length} items left` : 'Empty list'}</p>

              <ul className={'flex gap-5'}>
                <li>All</li>
                <li>Active</li>
                <li>Completed</li>
              </ul>

              <Button variant={'ghost'}>Clear Completed</Button>
            </div>
          </TableCaption>
          <TableBody>
            {todos.map(todo => (
              <TableRow key={todo.id} className={'flex items-center'}>
                <TableCell className={'flex w-max'}>
                  <Toggle className={'h-6 w-6'} size={'sm'} variant='outline' aria-label='Toggle italic'></Toggle>
                </TableCell>
                <TableCell className={'w-full'}>{todo.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className={cn('text-center text-sm', !todos.length && 'hidden')}>Drag and drop to reorder list</p>
    </>
  )
}
