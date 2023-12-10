import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Toggle } from '@/components/ui/toggle'

export default function Home() {
  return (
    <main className={'container'}>
      <div className={'flex justify-between py-28'}>
        <h1 className={'text-4xl font-bold uppercase tracking-widest text-white'}>Todo</h1>
        <ModeToggle />
      </div>

      <Input className={'mb-10 h-12 text-base'} placeholder={'Create a new todo...'} />

      <div className={'mb-16 overflow-hidden rounded-lg border'}>
        <Table className={'bg-background text-base'}>
          <TableCaption className={'m-0 p-4  text-left'}>
            <div className={'flex flex-wrap items-center justify-center gap-5 sm:justify-between'}>
              <p>2 items left</p>

              <ul className={'flex gap-5'}>
                <li>All</li>
                <li>Active</li>
                <li>Completed</li>
              </ul>

              <Button variant={'ghost'}>Clear Completed</Button>
            </div>
          </TableCaption>
          <TableBody>
            <TableRow className={'flex items-center'}>
              <TableCell className={'flex w-max'}>
                <Toggle className={'h-6 w-6'} size={'sm'} variant='outline' aria-label='Toggle italic'></Toggle>
              </TableCell>
              <TableCell className={'w-full'}>Some todo text...</TableCell>
            </TableRow>
            <TableRow className={'flex items-center'}>
              <TableCell className={'flex w-max'}>
                <Toggle className={'h-6 w-6'} size={'sm'} variant='outline' aria-label='Toggle italic'></Toggle>
              </TableCell>
              <TableCell className={'w-full'}>Some todo text...</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p className={'text-center text-sm'}>Drag and drop to reorder list</p>
    </main>
  )
}
