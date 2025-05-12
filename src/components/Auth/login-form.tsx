import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/firebase";
import { cn } from "@/lib/utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate=useNavigate();


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      console.log("メールアドレスまたはパスワードが入力されていません");
      return;
    }
    
     signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        navigate('/home')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  ref={emailRef}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">パスワード</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    パスワードをお忘れですか?
                  </a>
                </div>
                <Input id="password" type="password" ref={passwordRef} />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" onClick={handleSignIn}>
                  ログイン
                </Button>
                <Button variant="outline" className="w-full">
                  Googleでログイン
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              <a href="/register" className="underline underline-offset-4">
                サインアップ
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
