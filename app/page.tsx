"use client"

import Navbar from '@/components/navbar'

import Hero from '@/components/hero'


import CustomSection from '@/components/sections'
import Footer from '@/components/footer'

interface Category{
  name: string
}
export default function Home() {

  return (
    <>
    <main className='h-14 w-full items-center'>
      <div className='' >
      <Navbar/>
      </div>
      <div className='container w-full'>
<Hero/>

<CustomSection {...{name: "movies"} as Category}/>
<CustomSection {...{name: "books"} as Category}/>
<CustomSection {...{name: "tv"} as Category}/>
<CustomSection {...{name: "basketball"} as Category} />
<hr className='border-0 h-[0.2rem] bg-orange-400 mt-10' ></hr>
      </div>    
     <Footer/>
    </main>
    
    </>

  )
}
