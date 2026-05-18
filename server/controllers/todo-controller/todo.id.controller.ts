import { 
  todoGetOne, 
  todoPUT
} from "@/server/modules/todo-module/todo.module"; 

import { NextRequest } from "next/server";


import { 
  AuthCheck
} from "@/utils/auth-check/auth.check"; 

export async function PUT( 
  request: NextRequest, 
  { params }: { params: { id: string } },

){ 
  const response = await AuthCheck(); 
  if(response) return response; 

  return await todoPUT(request); 
}


export async function GET( 
  request: NextRequest, 
  { params }: { params: { id: string } },

){ 
  const response = await AuthCheck(); 
  if(response) return response; 

  return await todoGetOne(request); 
}

