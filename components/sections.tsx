
import { useEffect, useState } from "react"
import ListItem from "./ui/list-item"
import { DocumentData, Timestamp, collection, getDocs } from "firebase/firestore"
import { firestore } from "@/ firebase/firebase"
import { poppins } from "./fonts"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import getPostsByCategory from "@/lib/getPostsByCategory"
import { notFound } from "next/navigation"

type Category = {
    name: string
}
export default async function CustomSection(category: Category){

    const postsData = getPostsByCategory(category.name)
    const data = await postsData
    if(data == undefined) return notFound()
    return (
<div>
<div className="w-full flex  justify-between items-end">
      <h1 className='mx-10 relative text-2xl py-8 md:text-4xl' style={{fontFamily: poppins.style.fontFamily}}>
<span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                dark:to-accentDark/50 bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
  {category.name.slice(0,1).toUpperCase()+ category.name.slice(1,category.name.length)}
  </span>
  </h1>
        <Link
          href={"/posts/" + category.name}
          className="inline-block font-medium text-accent dark:text-accentDark underline underline-offset-2 text-base md:text-lg"
        > <h1 className='mx-10 relative text-md py-8 lg:text-xl' style={{fontFamily: poppins.style.fontFamily}}>
          view all
          </h1>
          
        </Link>

      </div>
      
      
      {data.length!=0 ?
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-20 mt-6 mx-6">
      {data.slice(0,3).map((item,index) => {
        return <Link key={index} href={'posts/' + category.name + '/'+ item.id}>
          <ListItem {...item}/>
        </Link>
      
      }) }
      </div>:<h1 className="text-2xl w-full justify-center mx-10">Sorry there are no items...</h1>}
  
      </div>
      
    )
}