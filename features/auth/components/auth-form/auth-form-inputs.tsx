import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


export function AuthFormInput(
  { 
    label, 
    onChange, 
    placeHolder, 
    type
  }
  : 
  { 
    label: string; 
    placeHolder: string; 
    onChange: ()=>{}; 
    type: "password" | "confirmPassword" | "file" | "email" | "input"
  }
){ 

  return ( 
    <div
      className="
        grid gap-2 
      "
    >
      <Label 
        htmlFor="password"
      >
        { 
          label
        }
      </Label>
      <Input 
        placeholder={placeHolder}
        onChange={onChange}
        type={type}
      />
    </div>
  )
}