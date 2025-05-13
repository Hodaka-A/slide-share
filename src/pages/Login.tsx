import { LoginForm } from "@/components/Auth/login-form";

const Login = () => {
  return (
    <>
      <div className="flex items-center gap-2">
      </div>
      <div className="flex max-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
