import { 
  BaseRepository
} from "@/lib/repositories/base.repository"; 

import { 
  Category
} from "@/auto-generated/zod"; 

export class CategoryFactory { 
  protected repository: BaseRepository<Category> | undefined; 

  protected async getRepository(){ 
    if(this.repository) return this.repository; 
    this.repository = new BaseRepository(); 
    return this.repository; 
  }

  async createCategory(data: Partial<Category>){ 
    const repository = await this.getRepository(); 

    const response = await repository.createOne(data); 

    return response; 
  }

  async findManyCategory(){ 
    const repository = await this.getRepository(); 

    const response = await repository.findMany(); 

    return response; 
  }

  async findOneCategory(data: Partial<Category>){ 
    const repository = await this.getRepository(); 

    const response = await repository.findOne(data); 
    
    return response; 
  }


  async editCategory(data: Partial<Category>){ 
    const repository = await this.getRepository(); 

    const response = await repository.editOne(data); 

    return response; 
  }

  async deleteCategory(data: Partial<Category>){ 
    const repository = await this.getRepository(); 

    const response = await repository.deleteOne(data); 

    return response; 
  }
}