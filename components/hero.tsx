import Image from "next/image";
import { inter, raleway } from "./fonts";
import Link from "next/link";

export default function Hero(){
    return (
        <div className='w-full inline-block'>
        <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[40vh] sm:h-[60vh]'>
            <div className='absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0
            ' />
        <Image src='/bg4.jpg'
        placeholder='blur'
        blurDataURL='L98qNf^*R4NF*0kqV?smpJt7n$bI'
        alt='Bg image'
        fill
        className='w-full h-full object-center object-cover rounded-3xl -z-10'
        sizes='100vw'
        priority
        />

        <div className='w-full h-full p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center z-0 text-light'>
            {/* <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} /> */}
            <Link href={'/'} className='mt-6'>
            <h1 className='align-middle font-bold capitalize text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl' style={{fontFamily:raleway.style.fontFamily,fontWeight:raleway.style.fontWeight, color: `#ffffff`}}>
                <span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                dark:to-accentDark/50 bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
                Welcome to our blog. 👋 
                </span>
            </h1>
            </Link>
            {/* <p className={'hidden sm:inline-block mt-4 md:text-lg lg:text-xl font'} style={{fontFamily:raleway.style.fontFamily,fontWeight:raleway.style.fontWeight, color: `#ffffff`}}>
               Maintained by Srija and Ruthvik.
            </p> */}
        </div>
    </article>
    </div>
    )
}