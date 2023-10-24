import Navbar from "@/components/navbar";

export default function NotFound(){
    return (
        <div>
            <Navbar/>
            <div className="container w-full flex-row">
            <h2 className="text-lg px-12 align-middle">The Page you are looking for does not exist</h2>
            </div>
        
        </div>
    )
}