import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ListItem from "@/components/ui/list-item"
import getPostsByCategory from "@/lib/getPostsByCategory"
import Link from "next/link"
import { notFound } from "next/navigation"

type Props = {
  params: {
    category: string
  }
}
export async function generateMetadata({params} :Props){
  const postsData = getPostsByCategory(params.category)
  const data = await postsData
  if(data == undefined) return {
    title: "Page Not Found",
    description: 'This page was not found'
  }
  const title = params.category.slice(0,1).toUpperCase() + params.category.slice(1) 
  return {
    title: title,
    description: `This page contains posts about ${params.category}`
  }
}
export default async function AllPosts({ params }: Props){

    const postsData = getPostsByCategory(params.category)
    const data = await postsData
    if(data == undefined) return notFound()
    return (<>
      <Navbar/>
    <div className="container w-full">
    {data.length!=0 ?
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-20 mt-6 mx-6">
            {data.map((item,index) => {
              return <Link href={'/posts/' + params.category + '/' + item.id} key={index}><ListItem {...item}/></Link>
            }) }
            </div>:<h1 className="text-2xl w-full justify-center mx-10">Sorry there are no items...</h1>}
    </div>
    <div className="container w-full">
          <hr className='border-0 h-[0.2rem] bg-orange-400 mt-10' ></hr>
          </div>
          <Footer/>
        </>
    )
}