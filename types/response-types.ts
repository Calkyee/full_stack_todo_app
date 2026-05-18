

export type responseType<T> = { 
  message: string; 
  status: number; 
  data: T[]
}