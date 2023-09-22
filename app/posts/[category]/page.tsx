"use client"
import { firestore } from "@/ firebase/firebase"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ListItem from "@/components/ui/list-item"
import { Skeleton } from "@/components/ui/skeleton"
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
interface Item{
    id: string,
    title: string,
    url: string,
    subtitle: string,
    text:string
  }
export default function AllPosts({ params }: { params: { category: string }}){
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState<Item[]>([])
    useEffect(()=>{
        (async()=>{
            setLoading(true)
         const querySnapshot =  await getDocs(collection(firestore,params.category))
         setLoading(false)
        const items:Item[] = []
         querySnapshot.forEach((doc:DocumentData) => {
            items.push(doc.data())
        });
        setData(items)
        })()
    },[loading,data,params.category])
    return (<>
      <Navbar/>
    <div className="container w-full">
    {data.length!=0 ?
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-20 mt-6 mx-6">
            {data.map((item,index) => {
              return <Link href={'/posts/' + params.category + '/' + item.id}><ListItem {...item} key={index}/></Link>
            }) }
            </div>: loading ?  <div className="flex items-center space-x-4">
            
            <div className="space-y-2 mx-10">
              <Skeleton className="h-4 w-[30vh]" />
              <Skeleton className="h-4 w-[25vh]" />
            </div>
            
          </div>:<h1 className="text-2xl w-full justify-center mx-10">Sorry there are no items...</h1>}
    </div>
    <div className="container w-full">
          <hr className='border-0 h-[0.2rem] bg-orange-400 mt-10' ></hr>
          </div>
          <Footer/>
        </>
    )
}