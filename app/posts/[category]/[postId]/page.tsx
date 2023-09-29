"use client"
import { auth, firestore } from "@/ firebase/firebase"
import { poppins } from "@/components/fonts"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { DocumentData, Timestamp, collection, deleteDoc, deleteField, doc, getDocs, query, where } from "firebase/firestore"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
interface Item{
    id: string,
    title: string,
    date:Timestamp,
    url: string,
    subtitle: string,
    text:string
  }
export default function AllPosts({ params }: { params: { category: string,postId: string }}){
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState<Item>()
    const [isLogin,setIsLogin] = useState(false)
    const router = useRouter()
    async function handleDelete(){
      const querySnapshot = await getDocs(query(collection(firestore,params.category),where('id','==',params.postId)))
       const temp = querySnapshot.docs.at(0)
            await deleteDoc(doc(firestore,params.category,temp?.id as string))
      router.push('/')
    }
    function handleEdit(){
        router.push('/posts/'+ params.category+'/' + params.postId+ '/edit')
    }
    useEffect(()=>{
        (async()=>{
          await auth.authStateReady()
          if(auth.currentUser!=null) setIsLogin(true)
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
        {data.date.toDate().toDateString()}
        </span>
      </div>
      <div className="mt-10 overflow-scroll overflow-x-hidden max-h-[60vh] " style={{scrollbarWidth: `none`}}> 
        <p className="text-sm md:text-md">

      {data.text}

            
        </p>
      </div>
        </div>
        </div> : <h1>Please wait</h1>}
       {isLogin &&  <div className="grid lg:grid-cols-2 grid-cols-1 justify-center grid-rows-auto gap-5 md:gap-y-20 gap-y-2 mt-10 mx-6">
         <div className="flex md:justify-end justify-center">
         <Button className="px-10 w-4" onClick={handleEdit}>Edit</Button>
          </div>
         <div className="flex md:justify-start justify-center">
         <Button className="px-10 w-4" onClick={handleDelete}>Delete</Button>
         </div>
        
        </div>}
    </div>
    <div className="container w-full">
          <hr className='border-0 h-[0.2rem] bg-orange-400 mt-20' ></hr>
          </div>
          <Footer/>
        </>
    )
}