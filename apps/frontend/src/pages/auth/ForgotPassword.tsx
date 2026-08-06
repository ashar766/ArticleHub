import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { forgotPassword } from "../../services/auth.services";

type ForgotPasswordDto = {
  email: string;
};

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordDto>();

  const onSubmit = async (data: ForgotPasswordDto) => {
    try {
      const response = await forgotPassword(data.email);

      alert(response.message);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <div className="mb-6">
        <p className="text-center text-sm text-gray-600 sm:text-base">
          Enter your registered email address and we'll send you a password
          reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address",
            },
          })}
          error={errors.email?.message}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
        </Button>

        <div className="flex flex-col items-center justify-between gap-3 pt-2 text-sm sm:flex-row">
          <Link
            to="/login"
            className="font-medium text-yellow-600 transition hover:text-yellow-700 hover:underline"
          >
            Back to Login
          </Link>

          <Link
            to="/reset-password"
            className="font-medium text-yellow-600 transition hover:text-yellow-700 hover:underline"
          >
            Already have a reset token?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
