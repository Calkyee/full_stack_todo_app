import { 
  NextRequest,
  NextResponse, 
} from "next/server"; 

import { 
  TodoService
} from "@/server/services/todo-service/todo.service"; 

/**
 * ============
 * Docker does not like module level initialization because environment variables are hard to pass on when it's running on docker in development environments
 * =============
 */

export async function todoPOST(
  request: NextRequest
){ 
  const service = new TodoService(); 

  const json = await request.json();
  
  const response = await service.createTodo(json); 

  return NextResponse.json( 
    response, 
    { 
      status: response.status
    }
  )

}

export async function todoGET(
  request: NextRequest
){
  const service = new TodoService(); 
  
  const response = await service.findManyTodo(); 

  return NextResponse.json( 
    response, 
    { 
      status: response.status
    }
  )

}

export async function todoDELETE(
  request: NextRequest
){ 
  const service = new TodoService(); 

  const json = await request.json(); 

  const response = await service.deleteTodo(json); 

  return NextResponse.json( 
    response, 
    { 
      status: response.status
    }
  )

}

export async function todoPUT(
  request: NextRequest
){
  const service = new TodoService(); 

  const json = await request.json(); 

  const response = await service.updateOneTodo(json); 

  return NextResponse.json( 
    response, 
     { 
      status: response.status
     }
  )
}

export async function todoGetOne( 
  request: NextRequest
){ 
  const service = new TodoService(); 
  
  const json = await request.json(); 

  const response = await service.findOneTodo(json); 

  return NextResponse.json( 
    response, 
    { 
      status: response.status
    }
  )
}