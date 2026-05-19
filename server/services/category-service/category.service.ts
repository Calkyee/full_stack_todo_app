import { 
  CategoryFactory
} from "@/lib/factories/category-factory/category.factory"; 

import { 
  Category
} from "@/auto-generated/zod"; 

import { 
  responseType
} from "@/types/response-types"; 

import typia from "typia"

/**
 * ===================================================================
 * This is the category service, this service 
 * exposes the category factory methods and implements business logic 
 * ===================================================================
 */

export class CategoryService { 
  protected factory : CategoryFactory | undefined; 

  protected async getFactory (){ 
    if(this.factory) return this.factory; 
    this.factory = new CategoryFactory(); 
    return this.factory; 
  }


  async getCategory(
    id: Category['id']
  ): Promise<responseType<Category>>{
    if(!typia.is<Category['id']>(id)){   
      return { 
        data: [], 
        message: "invalid data", 
        status: 400 
      }
    }

    const factory = await this.getFactory(); 

    const existingCategory = await factory.findOneCategory({ id });
    
    if(existingCategory.data.length === 0){ 
      return { 
        data: [], 
        message: "no categories found", 
        status: 404
      }
    }

    return existingCategory; 
  }

  async getManyCategory( 
  ): Promise<responseType<Category>>{ 
    const factory = await this.getFactory(); 

    const categories = await factory.findManyCategory(); 
    
    if(categories.data.length === 0) return { 
      data: [], 
      message: "no categories found", 
      status: 404
    }

    return categories
  }



  
  async createCategory( 
    data: Partial<Category>
  ): Promise<responseType<Category>>{ 
    
    if(!typia.is<Partial<Category>>(data)){
      return { 
        data: [], 
        message: "invalid data", 
        status: 400
      }
    }

    const factory = await this.getFactory(); 

    const existingCategory = await factory.findOneCategory(data); 

    if(existingCategory.data.length !== 0) return { 
      data: [], 
      message: "category already exists", 
      status: 409
    }

    const newCategory = await factory.createCategory(data); 
    return newCategory; 
  }

  async editCategory( 
    data: Partial<Category>
  ): Promise<responseType<Category>>{ 
    if(!typia.is<Partial<Category>>(data)) return { 
      data: [], 
      message: "invalid data", 
      status: 400 
    }
    
    const factory = await this.getFactory(); 

    const existingCategory = await factory.findOneCategory(data); 

    if(existingCategory.data.length === 0) return { 
      data: [
      ], 
      message: "unable to find category", 
      status: 404  
    }

    await factory.editCategory(data);  

    const updatedCategory = await factory.findOneCategory(data); 

    if(updatedCategory === data) return { 
      data: [

      ], 
      message: "unable to update category please provide a value", 
      status: 400 
    }


    return updatedCategory; 
  }

  async deleteCategory( 
    data: Partial<Category>
  ): Promise<responseType<Category>> { 
    
    if(!typia.is<Partial<Category>>(data)) return { 
      data: [], 
      message: "invalid data", 
      status: 400
    }

    const factory = await this.getFactory(); 

    const existingFactory = await factory.findOneCategory(data); 

    if(existingFactory.data.length === 0) return { 
      data: [], 
      message: "unable to find category", 
      status: 404
    }

    const response = await factory.deleteCategory(data); 

    const deletedFactory = await factory.findOneCategory(data); 

    if(deletedFactory.data.length !== 0) return { 
      data: [
        ...deletedFactory.data
      ], 
      message: "failed to delete factory", 
      status: 500 
    }

    return response; 
  }
}