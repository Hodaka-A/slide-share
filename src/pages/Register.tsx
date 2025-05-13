import { RegisterForm } from "@/components/Auth/register-form";

const Register = () => {
  return (
    <div>
      <div className="flex max-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
