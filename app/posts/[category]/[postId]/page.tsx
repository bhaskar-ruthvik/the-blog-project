"use client"
import { firestore } from "@/ firebase/firebase"
import { poppins } from "@/components/fonts"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ListItem from "@/components/ui/list-item"
import { Skeleton } from "@/components/ui/skeleton"
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore"
import Image from "next/image"
import { useEffect, useState } from "react"
interface Item{
    id: string,
    title: string,
    url: string,
    subtitle: string,
    text:string
  }
export default function AllPosts({ params }: { params: { category: string,postId: string }}){
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState<Item>()
    useEffect(()=>{
        (async()=>{
            setLoading(true)
         const querySnapshot =  await getDocs(query(collection(firestore,params.category),where('id','==',params.postId)))
         setLoading(false)
         querySnapshot.forEach((doc:DocumentData) => {
            setData(doc.data())
        });
        })()
    },[loading,data,params.category,params.postId])
    return (<>
      <Navbar/>
    <div className="container sm:px-[2rem] px-[0.2rem]  w-full">
 
   {data!=null ? <div className="grid lg:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-auto gap-20 md:gap-y-20 gap-y-10 mt-6 mx-6">
        <div className="w-full h-full flex items-center justify-center">
            <Image src={data.url} width={200} height={200} className="aspect-auto md:h-[80vh] w-auto h-[50vh]" alt={'picture'} sizes="70vh"/>
        </div>
        <div> 
        <div className="flex flex-col w-full mt-0 sm:mt-4">
        <span className="uppercase text-accent dark:text-accentDark font-semibold text-sm sm:text-lg" style={poppins.style}>
        {data.title}
        </span>
        <div className="inline-block my-1">
          <h2 className="font-semibold capitalize text-2xl sm:text-4xl" style={poppins.style}>
            <span
              className="bg-gradient-to-r from-accent/50 to-accent/50  dark:from-accentDark/50
              dark:to-accentDark/50
              bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
           {data.subtitle}
            </span>
          </h2>
        </div>

        <span className="capitalize text-gray pt-2 dark:text-light/50 font-semibold text-sm  sm:text-base">
        22nd September 2023
        </span>
      </div>
      <div className="mt-10 overflow-scroll overflow-x-hidden max-h-[60vh] " style={{scrollbarWidth: `none`}}> 
        <p className="text-sm md:text-md">
            {data.text}
        </p>
      </div>
        </div>
        </div> : <h1>Please wait</h1>}
    </div>
    <div className="container w-full">
          <hr className='border-0 h-[0.2rem] bg-orange-400 mt-20' ></hr>
          </div>
          <Footer/>
        </>
    )
}