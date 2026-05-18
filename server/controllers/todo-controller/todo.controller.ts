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
  AuthCheck
} from "@/utils/auth-check/auth.check"; 

/**
 * ============
 *  Authcheck may seem problematic, but the undefined part is fine because we don't need to complicate it further. For now it works and when it breaks we fix, but we don't fix what isn't breaking. 
 * =============
 */

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