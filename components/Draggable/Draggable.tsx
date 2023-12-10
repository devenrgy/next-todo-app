import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { PropsWithChildren } from 'react'

export interface DraggableProps {}

export function Draggable(props: PropsWithChildren<DraggableProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  })
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined

  return (
    <div id={'draggable'} {...props} style={style} ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  )
}
