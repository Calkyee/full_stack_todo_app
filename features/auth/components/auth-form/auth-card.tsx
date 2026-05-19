import { 
  Card
} from "@/components/ui/card"; 


export function AuthCard(
  { 
    children
  }
  : 
  { 
    children : React.ReactNode
  }
){ 

  return ( 
    <Card
      className="
        rounded-md rounded-t-none 
        max-w-d 
      "
    >
      { 
        children
      }
    </Card>
  )
}