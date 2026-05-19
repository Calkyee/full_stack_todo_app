import { 
  getOneModule
} from "@/server/modules/category-module/category.module"; 

import { 
  AuthCheck
} from '@/utils/auth-check/auth.check'; 

import { 
  NextRequest
} from "next/server"; 


export async function GET( 
  request: NextRequest, 
  { params } : { params: { id: string }}
){   
  const response = await AuthCheck(); 
  if(response) return response; 

  return await getOneModule(request, { params }); 
}