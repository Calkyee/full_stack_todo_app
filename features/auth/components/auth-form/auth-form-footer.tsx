import { 
  CardFooter
} from "@/components/ui/card"; 

import Link from "next/link";


export function AuthFormFooter(
  { 
    description, 
    href, 
    title
  }
  : 
  { 
    title: string; 
    href: string; 
    description: string; 
  }
){ 

  return ( 
    <CardFooter
      className="
        flex items-center justify-center
      "
    >
      <Link
        href={href}
        prefetch
        className="
          hover:underline text-primary 
        "
      >
      <p
        className="
          text-sm flex items-center gap-2 
        "
      >
        <span>
          {
            title
          }
        </span>
        <span>
          { 
            description
          }
        </span>

      </p>
      </Link>
    </CardFooter>
  )
}