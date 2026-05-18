import { 
  responseType
} from "@/types/response-types"; 

export type baseRepositoryType<T> = {
  findOne: (data: Partial<T>)=> Promise<responseType<T>>; 
  findMany: (data: Partial<T>)=> Promise<responseType<T>>; 
  createOne: (data: Partial<T>)=> Promise<responseType<T>>; 
  createMany: (data: Partial<T>)=> Promise<responseType<T>>; 
  deleteOne: (data: Partial<T>)=> Promise<responseType<T>>;
  deleteMany: (data: Partial<T>)=> Promise<responseType<T>>; 
  editOne: (data: Partial<T>)=> Promise<responseType<T>>; 
  editMany: (data: Partial<T>)=> Promise<responseType<T>>;  
}