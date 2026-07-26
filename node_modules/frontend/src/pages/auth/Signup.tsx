import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@articlehub/shared";
import type { z } from "zod";

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
      alert("Signup failed");
    }
  };

  return (
    <AuthLayout title="Create Account">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Input
          label="First Name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />

        <Input
          label="Last Name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />

        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Sign Up"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Signup;