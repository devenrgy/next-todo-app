import { ModeToggle } from '@/components/theme-toggle'
import { TodoList } from '@/components/TodoList'
import { TodoInput } from '@/components/TodoInput'

export default function Home() {
  return (
    <main className={'container'}>
      <div className={'flex justify-between py-28'}>
        <h1 className={'text-4xl font-bold uppercase tracking-widest text-white'}>Todo</h1>
        <ModeToggle />
      </div>

      <TodoInput />

      <TodoList />
    </main>
  )
}
