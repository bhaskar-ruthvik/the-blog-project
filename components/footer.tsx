import { Facebook, Github, Instagram, Twitter } from "lucide-react";

export default function Footer(){
    return (
        <footer className='w-full flex-col mt-10'>
    
        <h1 className='w-full flex justify-center items-center'>Maintained by Srija Guda and Bhaskar Ruthvik.</h1>
        <div className='container sm:ml-12 md:ml-auto mt-10 ml-8 grid grid-cols-4 grid-rows-1 md:w-[20%] mb-10 justify-center items-center'>
          <Instagram className="w-10"></Instagram>
          <Twitter className="w-10"></Twitter>
          <Facebook/>
          <Github/>
        </div>
       </footer>
    )
}