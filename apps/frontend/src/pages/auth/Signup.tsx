import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@articlehub/shared";
import type { z } from "zod";
import { Link } from "react-router-dom";

import { signup } from "../../services/auth.services";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

type SignupDto = z.infer<typeof SignupSchema>;

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupDto>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupDto) => {
    try {
      const response = await signup(data);

      alert(response.message);
    } catch (error) {
      console.error(error);
      alert("Signup failed.");
    }
  };

  return (
    <AuthLayout title="Create Account">
      <div className="mb-6">
        <p className="text-center text-sm text-gray-600 sm:text-base">
          Join ArticleHub and start sharing your articles with the community.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="First Name"
          placeholder="Enter your first name"
          autoComplete="given-name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />

        <Input
          label="Last Name"
          placeholder="Enter your last name"
          autoComplete="family-name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />

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
          placeholder="Create a password"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="border-t border-gray-200 pt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-yellow-600 transition hover:text-yellow-700 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Signup;
