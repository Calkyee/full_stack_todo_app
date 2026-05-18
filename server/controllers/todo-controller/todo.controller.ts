import { 
  NextRequest,
  NextResponse
} from "next/server"; 

import { 
  todoPOST, 
  todoDELETE, 
  todoGET, 
  todoPUT
} from "@/server/modules/todo-module/todo.module"; 

import { 
  auth 
} from "@/lib/auth";

import { 
  Todo
} from "@/auto-generated/zod"; 

import { 
  headers 
} from "next/headers";

import { responseType } from "@/types/response-types";

/**
 * ============
 *  Authcheck may seem problematic, but the undefined part is fine because we don't need to complicate it further. For now it works and when it breaks we fix, but we don't fix what isn't breaking. 
 * =============
 */

async function AuthCheck(){ 
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

export async function GET(
  request: NextRequest,
){ 
  const response =  await AuthCheck();
  if(response) return response; 
  
  return await todoGET(request)
}

export async function POST(
  request: NextRequest
){ 
  const response =  await AuthCheck();
  if(response) return response; 

  return await todoPOST(request); 
}

export async function DELETE(
  request: NextRequest
){ 
  const response =  await AuthCheck();
  if(response) return response; 

  return await todoDELETE(request); 
}

export async function PUT(
  request: NextRequest
){
  const response =  await AuthCheck();
  if(response) return response; 
  
  return await todoPUT(request); 
}