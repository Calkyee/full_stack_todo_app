import { 
  BaseRepository
} from "@/lib/repositories/base.repository"; 

import { 
  Todo
} from "@/auto-generated/zod"

export class TodoFactory { 
  protected repository: BaseRepository<Todo> | undefined; 
  
  protected async getRepository(){ 
    if(this.repository) return this.repository; 
    this.repository = new BaseRepository(); 
    return this.repository; 
  }
  
  async createTodo(data: Partial<Todo>){
    const repository = await this.getRepository();  
    
    const response = await repository.createOne(data); 
    
    return response; 
  }

  async findTodo(data: Partial<Todo>){ 
    const repository = await this.getRepository();
    
    const response = await repository.findOne(data); 
    
    return response; 
  }

  async findManyTodo(){ 
    const repository = await this.getRepository(); 

    const response = await repository.findMany();
    
    return response; 

  }

  async editTodo(data: Partial<Todo>){ 
    const repository = await this.getRepository();

    const response = await repository.editOne(data); 
    
    return response; 
  }

  async deleteTodo(data: Partial<Todo>){ 
    const repository = await this.getRepository(); 
    
    const response = await repository.deleteOne(data); 

    return response; 
  }
}