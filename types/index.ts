/**
 * =================================
 * Global Types
 *
 * This file contains the global type definitions for the application.
 * It's based on the Prisma schema to ensure consistency between the
 * frontend and backend.
 * =================================
 */

/**
 * We're gonna be replacing alot of this with auto-generated zod schema's because type errors can occur here. 
 * 
 */


/**
 * =================================
 * ENUMS
 * =================================
 */

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

/**
 * =================================
 * DATABASE MODELS
 *
 * These types represent the shape of the data in the database.
 * =================================
 */

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  todos: Todo[];
  categories: Category[];
};

export type Todo = {
  id: string;
  content: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  categoryId?: string | null;
  category?: Category | null;
  priority: Priority;
};

export type Category = {
  id: string;
  name: string;
  userId: string;
  todos: Todo[];
  createdAt: Date;
  updatedAt: Date;
};

/**
 * =================================
 * API PAYLOADS & PARAMS
 *
 * These types define the shape of the data sent to and received from the API.
 * =================================
 */

// Todos
export type CreateTodoPayload = {
  content: string;
  categoryId?: string;
  priority?: Priority;
};

export type UpdateTodoPayload = Partial<CreateTodoPayload> & {
  completed?: boolean;
};

export type TodoParams = {
  id: string;
};

// Categories
export type CreateCategoryPayload = {
  name: string;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

export type CategoryParams = {
  id: string;
};

/**
 * =================================
 * ZUSTAND STORE
 *
 * These types define the shape of the Zustand store, including its state
 * and the actions that can be performed on it.
 * =================================
 */

export interface TodoState {
  todos: Todo[];
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
}

export interface TodoActions {
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updatedTodo: Partial<Todo>) => void;
  removeTodo: (id: string) => void;
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, updatedCategory: Partial<Category>) => void;
  removeCategory: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export interface TodoStore extends TodoState, TodoActions {
  input: string;
  setInput: (input: string) => void;
}

export type ActiveTab = "all" | "active" | "completed" | string;
