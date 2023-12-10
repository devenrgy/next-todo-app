import { ModeToggle } from '@/components/theme-toggle'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Toggle } from '@/components/ui/toggle'

export default function Home() {
  return (
    <main className={'container'}>
      <div className={'flex justify-between py-28'}>
        <h1 className={'text-4xl uppercase tracking-widest font-bold text-white'}>Todo</h1>
        <ModeToggle />
      </div>

      <Input className={'h-12 mb-10 text-base'} placeholder={'Create a new todo...'} />

      <div className={'border rounded-lg overflow-hidden mb-16'}>
        <Table className={'bg-background text-base'}>
          <TableCaption className={'text-left p-4 m-0'}>2 items left</TableCaption>
          <TableBody>
            <TableRow className={'flex items-center'}>
              <TableCell className={'w-max flex'}>
                <Toggle className={'w-6 h-6'} size={'sm'} variant='outline' aria-label='Toggle italic'></Toggle>
              </TableCell>
              <TableCell className={'w-full'}>Some todo text...</TableCell>
            </TableRow>
            <TableRow className={'flex items-center'}>
              <TableCell className={'w-max flex'}>
                <Toggle className={'w-6 h-6'} size={'sm'} variant='outline' aria-label='Toggle italic'></Toggle>
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
