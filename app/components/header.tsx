import Link from 'next/link'


export default function Header() {
  return (
    <header className='w-full h-24 sticky top-0'>
      <div className='flex flex-row justify-between items-center px-8 py-2'>
        <div className='text-lg'>Transmiss</div>
        <Link href='/about' className='text-lg hover:text-purple-400'>About</Link>
      </div>
      <hr className='border-solid border-1' />
    </header>
  )
}
