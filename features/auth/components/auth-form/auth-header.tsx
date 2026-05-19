import { 
  CardTitle, 
  CardDescription, 
  CardHeader
} from "@/components/ui/card"; 


export function AuthHeader(
  { 
    cardDescription, 
    title, 
  }
  : 
  { 
    title: string; 
    cardDescription: string; 
  }
){ 

  return ( 
    <CardHeader>
      <CardTitle
        className="
          text-md
        "
      >
        { 
          title
        }
      </CardTitle>
      <CardDescription
        className="
          text-sm 
        "
      >
        { 
          cardDescription
        }
      </CardDescription>
    </CardHeader>
  )
}