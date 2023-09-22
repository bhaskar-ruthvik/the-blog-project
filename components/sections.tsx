import { useEffect, useState } from "react"
import ListItem from "./ui/list-item"
import { DocumentData, collection, getDocs } from "firebase/firestore"
import { firestore } from "@/ firebase/firebase"
import { poppins } from "./fonts"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
interface Item{
    id: string,
    title: string,
    url: string,
    subtitle: string,
    text:string
  }
type Category = {
    name: string
}
export default function CustomSection(category: Category){
    const [data,setData] = useState<Item[]>([])
    const [loading,setLoading] = useState(false)
    useEffect(() => {
      (async () => {
        setLoading(true)
         const querySnapshot =  await getDocs(collection(firestore,category.name))
         setLoading(false)
        const items:Item[] = []
         querySnapshot.forEach((doc:DocumentData) => {
            items.push(doc.data())
        });
        setData(items)
      })()
  },[])
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
        return <Link href={'posts/' + category.name + '/'+ item.id}>
          <ListItem {...item} key={index}/>
        </Link>
      
      }) }
      </div>: loading ?  <div className="flex items-center space-x-4">
      
      <div className="space-y-2 mx-10">
        <Skeleton className="h-4 w-[30vh]" />
        <Skeleton className="h-4 w-[25vh]" />
      </div>
      
    </div>:<h1 className="text-2xl w-full justify-center mx-10">Sorry there are no items...</h1>}
  
      </div>
      
    )
}