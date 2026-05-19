import { 
  CardContent
} from "@/components/ui/card"; 


export function AuthContent(
  { 
    children
  }
  : 
  { 
    children: React.ReactNode; 
  }
){ 

  return ( 
    <CardContent>
      <div
        className="
          grid gap-4 
        "
      >
        <div
          className="
            grid grid-cols-2 gap-4 
          "
        >
          { 
            children
          }
        </div>
      </div>
    </CardContent>
  )
}