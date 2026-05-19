import { 
  AuthCard 
} from "@/features/auth/components/auth-form/auth-card";

import { 
  AuthContent
} from "@/features/auth/components/auth-form/auth-content"; 

import { 
  AuthHeader
} from "@/features/auth/components/auth-form/auth-header"; 

import { 
  AuthFormFooter
} from "@/features/auth/components/auth-form/auth-form-footer"; 

import { 
  AuthFormInput
} from "@/features/auth/components/auth-form/auth-form-inputs"; 


export function AuthForm(
  { 
    useSignUp
  }
  : 
  { 
    useSignUp: boolean; 
  }
){ 
  return ( 
    <AuthCard>
       <AuthHeader cardDescription="Enter your information to create an account" title="Sign up"/>
        <AuthContent>
          <AuthFormInput 
            label="First name"
            placeHolder="type your first name here"
            onChange={()=>{ return { }}}
            type="input"
          />
          <AuthFormInput 
            label="last name"
            placeHolder="last name"
            onChange={()=>{ return { }}}
            type="input"
          />
          <AuthFormInput 
            label="email"
            placeHolder="your email"
            onChange={()=>{ return { }}}
            type="email"
          />
          <AuthFormInput 
            label="password"
            placeHolder="your secure password"
            onChange={()=>{ return { }}}
            type="password"
          />

          { useSignUp && (
              <>
                <AuthFormInput 
                  label="confirm password"
                  placeHolder="retype your secure password"
                  onChange={()=>{ return { }}}
                  type="confirmPassword"
                />

                <AuthFormInput 
                  label="profileImage"
                  placeHolder="custom profile image"
                  onChange={()=>{ return { }}}
                  type="file"
                />
              </>
            )
          } 
          <AuthFormFooter 
            title={
              useSignUp
              ? "Already have an account?"
              : "Don't have an account?"
            }
            description={ 
              useSignUp
              ? "Login" 
              : "SignUp"
            }
            href={
              useSignUp
              ? "/authenticate/signup"
              : "/authenticate/signin"
            }
          />
        </AuthContent>
    </AuthCard>
  )
}