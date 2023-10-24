import { firestore } from "@/ firebase/firebase";
import { DocumentData, collection, getDocs } from "firebase/firestore";

export default async function getPostsByCategory(category: string):Promise<Item[] | undefined>{
    const querySnapshot =  await getDocs(collection(firestore,category))
    
    if(querySnapshot.docs.length == 0 ) return undefined
    const returnList: Item[] =  querySnapshot.docs.map((doc:DocumentData)=>doc.data() as Item)
    return returnList
}