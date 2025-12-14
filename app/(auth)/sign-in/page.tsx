"use client";
import FooterLink from "@/components/forms/FooterLink";
import InputFields from "@/components/forms/InputFields";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success) router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to login");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-200 mt-4">
        Welcome back
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
        <InputFields
          name="email"
          placeholder="Enter your email address"
          label="Email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          }}
        />

        <InputFields
          name="password"
          placeholder="Enter your password"
          label="Password"
          register={register}
          error={errors.password}
          type="password"
          validation={{
            required: "Password is required",
            minLength: 10,
          }}
        />

        <Button
          type="submit"
          className="yellow-btn w-full mt-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in" : "Start your investing journey"}
        </Button>
        <FooterLink
          text="New to the business?"
          linkText="Sign Up"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
