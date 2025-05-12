import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/firebase/firebase"
import { cn } from "@/lib/utils"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const emailRef=useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const navigate=useNavigate();
  
  const hadleSubmit=async(e: React.FormEvent)=>{

      e.preventDefault();
      const email=emailRef.current?.value;
      const password = passwordRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;

      if( !email || !password || !confirmPassword)return;
      
      if(password!==confirmPassword){
        alert("パスワードが一致しません");
        return;
      }

      try{
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/home");
      }catch(error){
        console.log(error);
      }
    
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>会員登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={hadleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  ref={emailRef}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">パスワード</Label>
                <Input id="password" type="password"  ref={passwordRef} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">パスワード確認</Label>
                <Input id="confirmPassword" type="password" ref={confirmPasswordRef} />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  会員登録
                </Button>
                <Button variant="outline" className="w-full">
                  Googleで認証
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              アカウントは作成済みですか?{" "}
              <a href="/login" className="underline underline-offset-4">
                ログイン
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
