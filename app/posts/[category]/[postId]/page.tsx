import { app, auth } from "@/ firebase/firebase"
import EditRow from "@/components/editrow"
import { poppins } from "@/components/fonts"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import getAuthState from "@/lib/getAuthState"
import getPostById from "@/lib/getPostById"
import { Metadata } from "next"

import Image from "next/image"
import Link from "next/link"
import { notFound} from "next/navigation"
import ReactMarkdown from 'react-markdown'
type Props = {
  params: {
    category: string,
    postId: string
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postData = getPostById(params.category, params.postId)
  const data = await postData
  if (data == undefined) return {
    title: "Page Not Found",
    description: 'This page was not found'
  }

  return {
    title: `${data.title}`,
    description: `This post is about ${data.title}`
  }
}
export default async function AllPosts({ params }: Props) {
  // const [text,setText] = useState("")
  // const [loading,setLoading] = useState(false)
  // const [data,setData] = useState<Item>()
  // const [isLogin,setIsLogin] = useState(false)
  // const router = useRouter()

  const docsData = getPostById(params.category, params.postId)
  const data = await docsData
  if (data == undefined) return notFound()
  const paras: string[] = data.text.split("\\")
  const passedIn = {
    params: {
      category: params.category,
      postId: params.postId
    }
  }
  return (<>
    <Navbar />
    <div className="container sm:px-[2rem] px-[0.2rem]  w-full">

      <div className="grid-cols-1 md:grid-rows-1 grid-rows-auto gap-20 md:gap-y-20 gap-y-10 md:mx-12 mx-6">
        <div className="w-auto h-full flex items-center justify-center rounded-xl overflow-hidden relative">
          <Image 
          src={data.url} 
          width={200} 
          height={200} 
          className="rounded-xl aspect-auto md:object-cover md:object-top w-auto md:h-[60vh] h-auto hover:scale-105 transition-all ease duration-300" 
          alt={'picture'} 
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 60vw" />
        </div>
        <div>
          <div className="flex flex-col w-full mt-6 sm:mt-4">
            <span className="uppercase text-accent dark:text-accentDark font-semibold text-sm sm:text-lg" style={poppins.style}>
              {data.title}
            </span>
            <div className="inline-block my-1">
              <h2 className="font-semibold capitalize text-2xl sm:text-4xl" style={poppins.style}>
              <span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                dark:to-accentDark/50 bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
                  {data.subtitle}
                </span>
              </h2>
            </div>

            <span className="capitalize text-gray pt-2 dark:text-light/50 font-semibold text-sm  sm:text-base">
              {data.date.toDate().toDateString()}
            </span>
          </div>
          <div className="mt-10" style={{ scrollbarWidth: `none` }}>

            {paras.map((para, index) => {
              return (<div key={index}>
                <ReactMarkdown className='text-sm md:text-lg'>
                  {para}
                </ReactMarkdown>
                <br></br>
              </div>);
            })}


          </div>
        </div>
      </div>
      <EditRow {...passedIn}/>
    </div>
    <div className="container w-full">
      <hr className='border-0 h-[0.2rem] bg-orange-400 mt-20' ></hr>
    </div>
    <Footer />
  </>
  )
}