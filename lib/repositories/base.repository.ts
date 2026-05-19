import { 
  Repository
} from "@/lib/repositories/repository"; 

import { 
  baseRepositoryType
} from "@/types/repository-types"; 

import { responseType } from "@/types/response-types";

/**
 * ============
 * each method requires implementation but for now it's fine 
 * this pattern avoids vendor lock in even if we decide to skip Prisma 
 * ============
 */

export class BaseRepository<T> extends Repository implements baseRepositoryType<T>{ 
  async createMany(data: Partial<T>): Promise<responseType<T>> { 
    return { 
      data: [] as T[], 
      message: "", 
      status: 0
    }
  };

  async createOne(data: Partial<T>): Promise<responseType<T>> { 
    return { 
      data: [] as T[], 
      message: "", 
      status: 0
    }
  };



  async deleteMany(data: Partial<T>): Promise<responseType<T>> { 
    return { 
      data: [] as T[], 
      message: "", 
      status: 0
    }
  };

  async deleteOne(data: Partial<T>): Promise<responseType<T>> { 
    return { 
      data: [] as T[], 
      message: "", 
      status: 0
    }
  };

  async editOne(data: Partial<T>): Promise<responseType<T>> { 
    return { 
      data: [] as T[], 
      message: "", 
      status: 0
    }
  };

  async editMany(data: Partial<T>): Promise<responseType<T>> { 
    return { 
      data: [] as T[], 
      message: "", 
      status: 0
    }
  };

  async findOne(data: Partial<T>): Promise<responseType<T>> { 
    return { 
      data: [] as T[], 
      message: "", 
      status: 0
    }
  };

  async findMany(): Promise<responseType<T>> { 
    return { 
      data: [] as T[], 
      message: "", 
      status: 0
    }
  };
}