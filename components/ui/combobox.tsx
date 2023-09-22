import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, ChevronsUpDown, Command } from "lucide-react";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem } from "cmdk";
import { cn } from "@/lib/utils";
const frameworks = [
    {
      value: "movies",
      label: "Movies",
    },
    {
      value: "books",
      label: "Books",
    },
    {
      value: "tv",
      label: "TV",
    },
    {
      value: "basketball",
      label: "Basketball",
    },
    
  ]
export default function Combobox(){
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    return (
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
        <Button
  variant="outline"
  role="combobox"
  aria-expanded={open}
  className="w-[200px] justify-between ring-2 ring-slate-500"
>
   {value
    ? frameworks.find((framework) => framework.value === value)?.label
    : "Choose Category"}
    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
</Button>

        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
        <Command>
  <CommandInput placeholder="Search framework..." />
  <CommandEmpty>No framework found.</CommandEmpty>
  <CommandGroup>
    {frameworks.map((framework) => (
      <CommandItem
        key={framework.value}
        onSelect={(currentValue) => {
          setValue(currentValue === value ? "" : currentValue)
          setOpen(false)
        }}
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            value === framework.value ? "opacity-100" : "opacity-0"
          )}
        />
        {framework.label}
      </CommandItem>
    ))}
  </CommandGroup>
</Command>
            </PopoverContent>
    </Popover>
    )
}