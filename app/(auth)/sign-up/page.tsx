"use client";
import CountryList from "@/components/forms/CountryList";
import FooterLink from "@/components/forms/FooterLink";
import InputFields from "@/components/forms/InputFields";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "India",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUpWithEmail(data);
      if (result.success) router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create an account"
      );
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-200 mt-4">
        Sign up and personalize
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
        <InputFields
          name="fullName"
          placeholder="Enter your full name"
          label="Full name"
          register={register}
          error={errors.fullName}
          validation={{ required: "Username is required", minLength: 2 }}
        />

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

        {/* country  */}
        <CountryList
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />
        <SelectField
          name="investmentGoals"
          label="Investment goals"
          placeholder="Select your investment goals"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectField
          name="preferredIndustry"
          label="Preferred industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />
        <Button
          type="submit"
          className="yellow-btn w-full mt-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account" : "Start your investing journey"}
        </Button>
        <FooterLink
          text="Already have an account?"
          linkText="Sign In"
          href="/sign-in"
        />
      </form>
    </>
  );
};

export default SignUp;
