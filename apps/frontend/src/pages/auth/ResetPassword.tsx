import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { resetPassword } from "../../services/auth.services";

type ResetPasswordDto = {
  token: string;
  password: string;
};

function ResetPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordDto>();

  const onSubmit = async (data: ResetPasswordDto) => {
    try {
      const response = await resetPassword(data.token, data.password);

      alert(response.message);

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Unable to reset password.");
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <div className="mb-6">
        <p className="text-center text-sm text-gray-600 sm:text-base">
          Enter the reset token you received along with your new password to
          regain access to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Reset Token"
          type="text"
          placeholder="Enter your reset token"
          autoComplete="off"
          {...register("token", {
            required: "Reset token is required",
          })}
          error={errors.token?.message}
        />

        <Input
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          autoComplete="new-password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          error={errors.password?.message}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating Password..." : "Reset Password"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;
