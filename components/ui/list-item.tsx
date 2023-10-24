import Image from "next/image";
import { poppins } from "../fonts";




export default function ListItem(item: Item){
    return (
        <div className='flex justify-center'>
      
      <div className="group flex flex-col items-start text-dark dark:text-light w-[90%]">
      <div className="rounded-xl overflow-hidden relative lg:h-[30vh] lg:w-[100%] h-[21vh] w-[1005]">
        <Image
          src= {item.url} 
          // placeholder="blur"
          // blurDataURL={blog.image.blurhashDataUrl}
          alt={'pic'}
          width={400}
          height={300}
          className=" aspect-[4/3] h-full sm:w-full object-cover object-top  group-hover:scale-105 transition-all ease duration-300 "
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 60vw"
        />
      </div>

      <div className="flex flex-col w-full mt-4">
        <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm" style={poppins.style}>
        {item!= null ? item.title : null}
        </span>
        <div className="inline-block my-1">
          <h2 className="font-semibold capitalize  text-base sm:text-lg" style={poppins.style}>
            <span
              className="bg-gradient-to-r from-accent/50 to-accent/50  dark:from-accentDark/50
              dark:to-accentDark/50
              bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
            {item!= null ? item.subtitle : null}
            </span>
          </h2>
        </div>

        <span className="capitalize text-gray dark:text-light/50 font-semibold text-sm  sm:text-base">
          {/* {format(new Date(blog.publishedAt), "MMMM dd, yyyy")} */}
        </span>
      </div>
    </div>  

             
      </div>
    )
}