import { 
  DELETE, 
  GET, 
  POST, 
} from "@/server/controllers/todo-controller/todo.controller"; 

/**
 * =================================
 * todo-controller handles routing to modules 
 * modules calls the relivant service 
 * the service handles input validation, business logic and calls the factory for restful operations 
 * this comment is for developers taking a quick look and Ai's seeing paseted code. This is originally a junior codebase so there is no documentation yet. 
 * 
 * PUT is missing because it's a update / edit route this route is a main route with no ID acception. Specific routes go under todo/[id]/route.ts
 * =================================
 */

// Export controllers 
export { DELETE, GET, POST }