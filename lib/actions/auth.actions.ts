"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  riskTolerance,
  preferredIndustry,
  country,
  investmentGoals,
}: SignUpFormData) => {
  try {
    const response = await auth?.api.signUpEmail({
      body: { email, name: fullName, password },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          riskTolerance,
          preferredIndustry,
          investmentGoals,
        },
      });
    }
    return {
      success: true,
      message: "email sent successfully",
      data: response,
    };
  } catch (error) {
    console.log("Sign up failed", error);
    return { success: false, error: "Sign up failed " };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth?.api.signInEmail({
      body: { email, password },
    });

    return { success: true, data: response };
  } catch (error) {
    console.log("Sign in failed", error);
    return { success: false, error: "Sign in failed " };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.log("Signout failed", e);
    return { success: false, error: "sign out failed" };
  }
};
