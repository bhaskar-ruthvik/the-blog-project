"use client"
import { app, auth, firestore, storage } from "@/ firebase/firebase";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/ui/pic-button";
import { Popover } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-dropdown-menu";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { DocumentData, Timestamp, addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import firebase from 'firebase/app'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {v4} from "uuid"
interface Item{
    id: string,
    title: string,
    date:Timestamp,
    url: string,
    subtitle: string,
    text:string
  }
const frameworks = [
    {
      value: "movies",
      label: "Movies",
    },
    {
      value: "books",
      label: "Books",
    },
    {
      value: "tv",
      label: "TV",
    },
    {
      value: "basketball",
      label: "Basketball",
    },
    
  ]
export default function EditPost({params} : { params: { category: string,postId: string }}){
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [title,setTitle] = useState("")
    const [subtitle,setSubtitle] = useState("")
    const [blog,setBlog] = useState("")
    const [path,setPath] = useState<File>()
    const [data,setData] = useState<Item>()
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        (async()=>{
            await auth.authStateReady()
           
           if(auth.currentUser==null){
            router.push('/')
           }
           setLoading(true)
           const querySnapshot =  await getDocs(query(collection(firestore,params.category),where('id','==',params.postId)))
           setLoading(false)
           querySnapshot.forEach((doc:DocumentData) => {
              setData(doc.data())
              
        })
        if(data==null) return;
        setTitle(data.title)
              setSubtitle(data.subtitle)
              setBlog(data.text)
              setLoading(false)
       
    })()
    },[router])
    
      function handleTitle(e:any){
        setTitle(e.target.value)
      }
      function handleSubtitle(e:any){
        setSubtitle(e.target.value)
      }
      function handleBlog(e:any){
        setBlog(e.target.value)
      }
      async function handleSubmit(){
        // setLoading(true)
       const querySnapshot = await getDocs(query(collection(firestore,params.category),where('id','==',params.postId)))
       const temp = querySnapshot.docs.at(0)
            await setDoc(doc(firestore,params.category,temp?.id as string),{
                title: title,
                subtitle: subtitle,
                date: Timestamp.fromDate(new Date()),
                text: blog,
            },{merge: true})

        setLoading(false)
        router.push('/')
        }

        
      
    return (
        <main className='container h-14 w-full items-center'>
        <Navbar/>
        {!loading ? <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 grid-rows-1 my-5 mx-10">
            <div>
            <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
      <Label>Title</Label>
      <Input placeholder={data==null ? "Enter the title of the article" : data.title} onChange={handleTitle}/>
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
      <Label>Subtitle</Label>
      <Input placeholder={data==null ? "Enter the subtitle of the article" : data.subtitle}  onChange={handleSubtitle}/>
    </div>
    {/* <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
      <Label className="text-md">Picture</Label>
      <Input id="picture" type="file" onChange={handleChange} />
    </div> */}
     
            <div className="grid w-full items-center gap-1.5 py-5">
            <Label>
                Article
            </Label>
            <Textarea rows={20} placeholder={data==null ? "Type here" : data.text}  className="ring-2 ring-slate-500" onChange={handleBlog}/>
            </div>
            <Button className="justify-center" onClick={handleSubmit}>Post</Button>
        </div>
        
        </div> : <div className="flex-col h-[80vh] w-full lg:mx-10 justify-center items-center"><h1 className="flex h-full text-6xl items-center justify-center">Please wait while the data uploads...</h1></div>}
        </main>
    )
}