"use client"
import { auth, firestore, storage } from "@/ firebase/firebase";
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
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {v4} from "uuid"

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
export default function Post(){
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [title,setTitle] = useState("")
    const [subtitle,setSubtitle] = useState("")
    const [blog,setBlog] = useState("")
    const [path,setPath] = useState<File>()
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        (async()=>{
            await auth.authStateReady()
           if(auth.currentUser!=null) return;
           else{
            console.log(auth.currentUser)
            router.push('/')
           }
           
        })()
    },[])
    function handleChange(e:any){
        setPath(e.target.files[0])
      }
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
        if(path==null) return;
        const picRef = ref(storage,`images/${path.name+v4()}`)
        setLoading(true)
        await uploadBytes(picRef,path);
       const url = await getDownloadURL(picRef)
        await addDoc(collection(firestore,value),{
            id: v4(),
            title: title,
            subtitle: subtitle,
            url: url,
            text: blog,
        })
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
      <Input placeholder="Enter the title of the article" onChange={handleTitle}/>
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
      <Label>Subtitle</Label>
      <Input placeholder="Enter the subtitle of the article" onChange={handleSubtitle}/>
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
      <Label className="text-md">Picture</Label>
      <Input id="picture" type="file" onChange={handleChange} />
    </div>
        <div className="grid w-full items-center gap-1.5 py-5">
            <Label>Category</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between ring-2 ring-slate-500"
        >
           {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Choose Category"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
                    </PopoverContent>
            </Popover>
        </div>
            </div>
        <div>
            <div className="grid w-full items-center gap-1.5 py-5">
            <Label>
                Article
            </Label>
            <Textarea rows={20} placeholder="Type Here" className="ring-2 ring-slate-500" onChange={handleBlog}/>
            </div>
            <Button className="justify-center" onClick={handleSubmit}>Post</Button>
        </div>
        
        </div> : <div className="flex-col h-[80vh] w-full lg:mx-10 justify-center items-center"><h1 className="flex h-full text-6xl items-center justify-center">Please wait while the data uploads...</h1></div>}
        </main>
    )
}