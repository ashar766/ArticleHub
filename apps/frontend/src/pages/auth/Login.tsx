import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, Role } from "@articlehub/shared";
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
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data);

      saveLogin(response.user, response.accessToken, response.refreshToken);

      if (response.user.role === Role.ADMIN) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid email or password.");
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <div className="mb-6">
        <p className="text-center text-sm text-gray-600 sm:text-base">
          Sign in to access your account and continue managing your articles.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-yellow-600 transition hover:text-yellow-700 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>

        <div className="border-t border-gray-200 pt-5 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-yellow-600 transition hover:text-yellow-700 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
