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
      const response = await resetPassword(
        data.token,
        data.password
      );

      alert(response.message);

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Unable to reset password");
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Input
          label="Reset Token"
          type="text"
          {...register("token", {
            required: "Reset token is required",
          })}
          error={errors.token?.message}
        />

        <Input
          label="New Password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Updating..."
            : "Reset Password"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;