"use client"
import { auth } from "@/ firebase/firebase";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/ui/pic-button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {useRouter} from 'next/navigation'
export default function Login(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const router = useRouter()
    function onEmailChange(e:any){
      setEmail(e.target.value)
    }
    function onPasswordChange(e:any){
        setPassword(e.target.value)
    }
    async function handleSubmit(){
       
       try{
        const userCredential = await signInWithEmailAndPassword(auth,email,password)
        console.log(userCredential.user)
       }catch(e){
        console.log(e)
       }
       router.push("/posts/new")

    }
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 grid-rows-1">
            <Image 
            src={'/bg7.jpg'}
            alt="login-pic"
            className="h-[100vh] w-full items-start invisible md:visible"
            height={1000}
            width={720}
            sizes="100vw"/>
            <div className='w-full h-full flex flex-col items-center justify-center text-light'>
                <Link href={'/'}>
                <p className="text-4xl py-3">👸 Cutieblogg</p>
                </Link>
            
         <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
      <Label>Email</Label>
      <Input placeholder="Enter your mail address" onChange={onEmailChange}/>
    </div>
     <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
       <Label>Password</Label>
       <Input type='password' placeholder="Enter your password" onChange={onPasswordChange}/>
     </div>
     <Button className="mt-5" onClick={handleSubmit}>Login</Button>
          </div>
      </div>
    //     <main className='container h-14 w-full items-center'>
    //      <Navbar />
    //      <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-center text-light'>
    //      <InputFile/>
    //      <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
    //   <Label>Email</Label>
    //   <Input placeholder="Enter your mail address"/>
    // </div>
    // <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
    //   <Label>Password</Label>
    //   <Input type='password' placeholder="Enter your password"/>
    // </div>
    //      </div>
        
    //     </main>
      
    )
}