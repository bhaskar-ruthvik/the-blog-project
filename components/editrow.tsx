"use client"
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { auth } from "@/ firebase/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import deletePostById from "@/lib/deletePostById";

type Props = {
    params: {
        category: string,
        postId: string
    }
}
export default function EditRow({params} : Props){
    const [login,setLogin] = useState(false)
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const router = useRouter()
    useEffect(()=>{
        (async()=>{
            await auth.authStateReady()
           if(auth.currentUser==null) return;
           setLogin(true)
              
        }) 
    ()},[])
    async function handleDelete(){
        setLoading(true)
        const status = await deletePostById(params.category,params.postId)
        setLoading(false)
        if(status===-1) setError(true)
        else{
            router.push('/')
        }
    }
    return (
        <div>
 {login &&  !loading ? <div className="grid lg:grid-cols-2 grid-cols-1 justify-center grid-rows-auto gap-5 md:gap-y-20 gap-y-2 mt-10 mx-6">
         <div className="flex md:justify-end justify-center">
        <Link href={'/posts/' + params.category + '/' + params.postId + '/edit'}>
        <Button className="px-10 w-4">Edit</Button>
        </Link>
         

        
          </div>
         <div className="flex md:justify-start justify-center">
         <Button className="px-10 w-4" onClick={handleDelete}>Delete</Button>
         </div>
        
        </div> : <div><h2>Please wait while the post is deleted</h2></div>}
        {error && <div><h2 className="text-red-500">There was an error deleting the post</h2></div>} 
        </div>
      
    )
}