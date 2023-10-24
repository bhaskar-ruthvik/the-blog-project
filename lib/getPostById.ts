import { firestore } from "@/ firebase/firebase";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";


export default async function getPostById(category: string, postId: string): Promise<Item | undefined> {
    const querySnapshot =  await getDocs(query(collection(firestore,category),where('id','==',postId)))
   if(querySnapshot.docs.length == 0 ) return undefined
   const returnItem = querySnapshot.docs[0].data() as Item
   return returnItem
   

}