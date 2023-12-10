'use client'

import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { Button } from '@/components/ui/button'
import { useAppStore, useAppSelector, useAppDispatch } from '@/lib/hooks'
import { removeTodo, clearCompletedTodos, completeTodo, Todo, sortTodos } from '@/lib/features/todos/todosSlice'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { X } from 'lucide-react'
import { Draggable } from '../Draggable'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

export interface TodoListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TodoList(props: TodoListProps) {
  const store = useAppStore()
  const { todos } = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

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
    dispatch(sortTodos())
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
          className={cn('mb-16 mt-10 overflow-hidden rounded-lg border bg-background', !todos.length && 'hidden')}
        >
          <Table className={'overflow-hidden text-base'}>
            <TableCaption className={'m-0 p-4  text-left'}>
              <div className={'flex flex-wrap items-center justify-center gap-5 sm:justify-between'}>
                <p>{todos.length ? `${todos.length} items left` : 'Empty list'}</p>

                <ul className={'flex'}>
                  <li>
                    <Button variant={'ghost'}>All</Button>
                  </li>
                  <li>
                    <Button variant={'ghost'}>Active</Button>
                  </li>
                  <li>
                    <Button variant={'ghost'}>Completed</Button>
                  </li>
                </ul>

                <Button onClick={handleClearCompletedTodos} variant={'ghost'}>
                  Clear Completed
                </Button>
              </div>
            </TableCaption>
            <TableBody>
              {todos.map(todo => (
                <TableRow key={todo.id} className={'flex items-center'}>
                  <TableCell>
                    <Checkbox onCheckedChange={() => handleCompleteTodo(todo)} className={'h-6 w-6 rounded-full'} />
                  </TableCell>
                  <TableCell className={cn('w-[600px] grow break-words', todo.completed && 'line-through')}>
                    {todo.value}
                  </TableCell>
                  <TableCell>
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
