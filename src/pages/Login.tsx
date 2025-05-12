import { LoginForm } from "@/components/Auth/login-form";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Link to="/home" className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary-foreground"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h10M7 12h10M7 17h10" />
            </svg>
          </div>
          <span className="text-xl font-bold">SlideShare</span>
        </Link>
      </div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
