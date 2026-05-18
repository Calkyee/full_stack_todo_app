import { 
  NextResponse
} from "next/server"; 

import { 
  Todo
} from "@/auto-generated/zod"; 

import { 
  headers 
} from "next/headers";

import { responseType } from "@/types/response-types";

import { 
  auth 
} from "@/lib/auth";

export async function AuthCheck(){ 
  const session = await auth.api.getSession({headers: await headers()}); 
  if(!session){ 
    return NextResponse.json<responseType<Todo>>( 
      { 
        data: [], 
        message: "Unauthenciated", 
        status: 401
      }, 
      { 
        status: 401
      }
    )
  }
}