import { 
  plan, 
  planType
} from "@/auto-generated/zod"; 

export const userPlan: plan = { 
  id: "", 
  planType: "free", 
  userId: "", 
  user: undefined
}

export const planLimitations: {
  planType: planType,
  // rate limits and configuration  
}[] = [ 
  { 
    planType : "free"
  }, 
  { 
    planType: "premium"
  }, 
  { 
    planType: "enterprise"
  }

]