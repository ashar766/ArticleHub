import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@articlehub/shared";
import type { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { login } from "../../services/auth.services";
import { useAuth } from "../../context/AuthContext";

type LoginForm = z.infer<typeof LoginSchema>;

function Login() {
  const navigate = useNavigate();

  const { login: saveLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  }); //So this whole block is just saying: Set up the login form so it can check the user’s email/password and handle submission.

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data);

      saveLogin(response.user, response.accessToken, response.refreshToken);

      if (response.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>

          <Link to="/signup" className="text-blue-600 hover:underline">
            Create Account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
