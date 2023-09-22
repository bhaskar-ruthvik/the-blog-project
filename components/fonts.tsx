import { Poppins,Inter,Raleway} from "next/font/google"

export const poppins = Poppins({
    weight: "500",
    subsets: ['latin'],
    
  })
  export const poppinsBold = Poppins({
    weight:"800",
    subsets:['latin']
  })
export const raleway = Raleway({
    weight: "800",
    subsets: ['latin']
})
export const inter = Inter({ weight: "600" ,subsets: ['latin'] })