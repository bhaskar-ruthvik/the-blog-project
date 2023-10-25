import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer(){
    return (
        <footer className='w-full flex-col mt-10'>
    
        <h1 className='w-full flex justify-center text-sm sm:text-md items-center'>Maintained by Bhaskar Ruthvik.</h1>
        <div className='container sm:ml-12 md:ml-auto mt-10 ml-8 grid grid-cols-4 grid-rows-1 md:w-[20%] mb-10 justify-center items-center'>
         <a target="_blank" href="https://www.instagram.com/srija_guda/"><Instagram className="w-10 hover:text-orange-400" ></Instagram></a>
         <a target="_blank" href="https://www.twitter.com/ruthvikb11/"><Twitter className="w-10 hover:text-orange-400" ></Twitter></a>
         <a target="_blank" href="https://www.linkedin.com/in/bhaskar-ruthvik-a7908324a/"><Linkedin className="w-10 hover:text-orange-400" /></a>
         <a target="_blank" href="https://www.github.com/bhaskar-ruthvik/"><Github className="w-10 hover:text-orange-400" ></Github></a>
        </div>
       </footer>
    )
}