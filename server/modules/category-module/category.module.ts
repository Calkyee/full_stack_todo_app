import { 
  CategoryService
} from "@/server/services/category-service/category.service"; 

import { 
  NextRequest, 
  NextResponse
} from "next/server";

/**
 * ==================================================================
 *  CategoryService handles correct status and message response types 
 * in case of success and in error handling so no try catch is 
 * required here. 
 * ==================================================================
 */

export async function getModule( 
){ 
  const service = new CategoryService(); 

  const response = await service.getManyCategory(); 

  return NextResponse.json( 
    response, 
    { 
      status: response.status 
    }
  )
}

export async function getOneModule(
  request: NextRequest, 
  { params } : { params : { id: string }}
){ 
  const service = new CategoryService(); 
  const { id } = params;
  
  const response = await service.getCategory(id); 

  return NextResponse.json(
    response, 
    { 
      status: response.status 
    }
  )
}

export async function postModule( 
  request: NextRequest 
){ 
  const service = new CategoryService();  

  const data = await request.json(); 

  const response = await service.createCategory(data); 

  return NextResponse.json( 
    response, 
    { 
      status: response.status 
    }
  )
}


export async function putModule( 
  request: NextRequest, 
){ 
  const service = new CategoryService(); 

  const data = await request.json(); 

  const response = await service.editCategory(data); 

  return NextResponse.json( 
    response, 
    { 
      status: response.status
    }
  );

}


export async function deleteModule( 
  request: NextRequest
){ 
  const service = new CategoryService(); 
  const data = await request.json(); 

  const response = await service.deleteCategory(data); 

  return NextResponse.json( 
    response, 
    { 
      status: response.status 
    }
  ); 
}


