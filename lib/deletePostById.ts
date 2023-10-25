import { firestore } from "@/ firebase/firebase"
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"

export default async function getPostById(category: string, postId: string): Promise<Number> {
    const querySnapshot = await getDocs(query(collection(firestore,category),where('id','==',postId)))
    if(querySnapshot.docs.length == 0) return -1
     const temp = querySnapshot.docs.at(0)
          await deleteDoc(doc(firestore,category,temp?.id as string))
   return 0
   

}