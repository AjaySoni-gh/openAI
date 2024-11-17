import React from 'react'
import Link from 'next/link'
const Header = () => {
  return (
    <header className="relative p-16 text-center">
    <Link href="/">
      <h1 className=' text-2xl lg:text-3xl '>Your Recipe Maker</h1>
  
    <div className="flex flex-col items-center space-y-4 text-3xl lg:text-5xl font-bold">
    <h2 className="px-2 py-1 bg-zinc-300 rounded mt-4 text-center transition transform hover:bg-zinc-400">
  Good Food Good Life
</h2>
      <div className="relative text-2xl lg:text-3xl font-normal ">
        <p> Powered by <span className="bg-cyan-500 rounded px-2 py-1 text-white ">AI!</span></p>
      </div>
    </div>
    </Link>
  </header>
  )
}

export default Header
