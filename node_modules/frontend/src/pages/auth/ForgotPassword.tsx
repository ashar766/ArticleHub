import { useForm } from "react-hook-form";
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
      alert("Something went wrong");
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Input
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Sending..."
            : "Send Reset Link"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;