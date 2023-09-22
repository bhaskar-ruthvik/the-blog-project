import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
export function InputFile(onChange: any) {
  
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
      <Label className="text-md" htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" onChange={onChange} />
    </div>
  )
}