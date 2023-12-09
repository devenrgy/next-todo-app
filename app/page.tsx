import { ModeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <main className={'container'}>
      <div className={'flex justify-between py-28'}>
        <h1 className={'text-4xl uppercase tracking-widest font-bold'}>Todo</h1>
        <ModeToggle />
      </div>
    </main>
  )
}
