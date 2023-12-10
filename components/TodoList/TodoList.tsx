'use client'

import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { Button } from '@/components/ui/button'
import { useAppStore, useAppSelector, useAppDispatch } from '@/lib/hooks'
import {
  removeTodo,
  clearCompletedTodos,
  completeTodo,
  Todo,
  filterTodos,
  reverseTodos,
} from '@/lib/features/todos/todosSlice'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { X } from 'lucide-react'
import { Draggable } from '../Draggable'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { useEffect, useState } from 'react'
import { saveLocalStorage } from '@/lib/localStorage'

export interface TodoListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TodoList(props: TodoListProps) {
  const store = useAppStore()
  const { todos: storeTodos } = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()
  const [todos, setTodos] = useState(storeTodos)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 10,
      },
    }),
  )

  useEffect(() => {
    setTodos(storeTodos)
    saveLocalStorage(storeTodos)
  }, [storeTodos])

  const handleCompleteTodo = (todo: Todo) => {
    dispatch(completeTodo(todo))
  }

  const handleClearCompletedTodos = () => {
    dispatch(clearCompletedTodos())
  }

  const handleRemoveTodo = (todo: Todo) => {
    dispatch(removeTodo(todo))
  }

  const handleOnDrag = () => {
    if (todos.length < 2) return
    dispatch(reverseTodos())
  }

  const handleSortTodos = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const filterType = evt.target as HTMLElement
    setTodos(filterTodos(store.getState(), filterType.textContent!.toLowerCase()))
  }

  return (
    <DndContext
      id={'todos'}
      autoScroll={false}
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleOnDrag}
      modifiers={[restrictToWindowEdges]}
    >
      <Draggable {...props}>
        <div
          {...props}
          className={cn(
            'mb-16 mt-10 cursor-auto overflow-hidden rounded-lg border bg-background active:cursor-move',
            !todos.length && 'hidden',
          )}
        >
          <Table className={'overflow-hidden text-base'}>
            <TableCaption className={'m-0 p-4 text-left'}>
              <div className={'flex flex-wrap items-center justify-center gap-5 sm:justify-between'}>
                <p>{todos.length ? `${todos.length} items left` : 'Empty list'}</p>

                <ul className={'flex'}>
                  <li>
                    <Button onClick={handleSortTodos} variant={'ghost'}>
                      All
                    </Button>
                  </li>
                  <li>
                    <Button
                      disabled={!storeTodos.some(todo => !todo.completed)}
                      onClick={handleSortTodos}
                      variant={'ghost'}
                    >
                      Active
                    </Button>
                  </li>
                  <li>
                    <Button
                      disabled={!storeTodos.some(todo => todo.completed)}
                      onClick={handleSortTodos}
                      variant={'ghost'}
                    >
                      Completed
                    </Button>
                  </li>
                </ul>

                <Button
                  className={cn(!storeTodos.some(todo => todo.completed) && 'invisible')}
                  onClick={handleClearCompletedTodos}
                  variant={'destructive'}
                >
                  Clear Completed
                </Button>
              </div>
            </TableCaption>
            <TableBody>
              {todos.map(todo => (
                <TableRow key={todo.id}>
                  <TableCell className={'w-min'}>
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => handleCompleteTodo(todo)}
                      className={'h-6 w-6 rounded-full'}
                    />
                  </TableCell>
                  <TableCell className={cn('w-full break-words', todo.completed && 'line-through')}>
                    {todo.value}
                  </TableCell>
                  <TableCell className={'w-min'}>
                    <Button onClick={() => handleRemoveTodo(todo)} variant={'ghost'}>
                      <X className='h-6 w-6' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Draggable>

      <p className={cn('text-center text-sm', !todos.length && 'hidden')}>Drag and drop to reorder list</p>
    </DndContext>
  )
}
