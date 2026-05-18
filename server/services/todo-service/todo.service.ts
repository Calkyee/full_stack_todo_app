import { 
  TodoFactory
} from "@/lib/factories/todo-factory/todo.factory"; 

import { 
  Todo
} from "@/auto-generated/zod"; 


import { 
  responseType
} from "@/types/response-types"; 

import typia from "typia"; 

export class TodoService {
  protected factory: TodoFactory | undefined; 
  
  async getFactory(){ 
    if(this.factory) return this.factory; 
    this.factory = new TodoFactory(); 
    return this.factory
  }

  async createTodo(data: Partial<Todo>): Promise<responseType<Todo>>{ 
    
    if(!typia.is<Partial<Todo>>(data)) return { 
      data: [], 
      message: "invalid data", 
      status: 400 
    }

    const validated = typia.assert<Partial<Todo>>(data); 

    const factory = await this.getFactory(); 

    // check if todo exists
    const existingTodo = await factory.findTodo(validated); 

    if(existingTodo) { 
      return { 
        data: [...existingTodo.data],
        message: "Todo already exists", 
        status: 400  
      }
    }

    const result = await factory.createTodo(validated); 
    
    return result; 
  }

  async findManyTodo(): Promise<responseType<Todo>>{ 
    const factory = await this.getFactory(); 
    
    const existingTodo = await factory.findManyTodo();

    if(existingTodo.data.length === 0){ 
      return { 
        data: [], 
        message: "No todo found", 
        status: 404
      }
    }

    return existingTodo; 
  }

  async findOneTodo(data: Partial<Todo>): Promise<responseType<Todo>> {
    if(!typia.is<Partial<Todo>>(data)) return { 
      data: [], 
      message: "invalid data", 
      status: 400
    }

    const validated = typia.assert<Partial<Todo>>(data); 

    const factory = await this.getFactory(); 

    const existingTodo = await factory.findTodo(validated); 

    if(existingTodo.data.length === 0){ 
      return { 
        data: [], 
        message: "No todo found", 
        status: 404 
      }
    }

    return existingTodo; 
  }

  


  async deleteTodo(data: Partial<Todo>): Promise<responseType<Todo>> {

    if(!typia.is<Partial<Todo>>(data)){ 
      return { 
        data: [], 
        message: "invalid data", 
        status: 400 
      }
    }

    const validated = typia.assert<Partial<Todo>>(data); 

    const factory = await this.getFactory(); 

    const existingTodo = await factory.findTodo(validated); 

    if(existingTodo.data.length === 0 ){ 
      return { 
        data: [], 
        message: "unable to find todo", 
        status: 404
      }
    }

    const result = await factory.deleteTodo(validated); 

    return result; 
  }

  async updateOneTodo(data: Partial<Todo>): Promise<responseType<Todo>> { 
    if(!typia.is<Partial<Todo>>(data)) { 
      return {
        data: [], 
        message: "invalid data", 
        status: 400
      }
    }

    const validated = typia.assert<Partial<Todo>>(data); 

    const factory = await this.getFactory(); 

    const existingTodo = await factory.findTodo(validated); 

    if(existingTodo.data.length === 0){ 
      return { 
        data: [], 
        message: "unable to find todo",
        status: 404 
      }
    }

    const result = await factory.editTodo(validated); 

    return result; 

  }

}