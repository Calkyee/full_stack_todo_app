import { 
  NextRequest, 
  NextResponse
} from "next/server"; 

import { 
  AuthCheck
} from "@/utils/auth-check/auth.check"; 

import { 
  getModule, 
  deleteModule, 
  postModule, 
  putModule
} from "@/server/modules/category-module/category.module"; 

export async function GET(){ 
  const response = await AuthCheck(); 

  if(response) return response; 
  return await getModule(); 
}

export async  function POST(
  request: NextRequest
){ 
  const response = await AuthCheck(); 
  if(response) return response;
  
  return await postModule(request); 
}


export async function PUT(
  request: NextRequest
){ 
  const response = await AuthCheck(); 
  if(response) return response; 
  return await putModule(request); 
}


export async function DELETE( 
  request: NextRequest 
){ 
  const response = await AuthCheck(); 
  if(response) return response; 
  return await deleteModule(request); 
}