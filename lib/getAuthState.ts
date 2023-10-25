import { auth } from "@/ firebase/firebase";

export default async function getAuthState(): Promise<boolean>{
    await auth.authStateReady()
    if(auth.currentUser===null) return false
    return true
}