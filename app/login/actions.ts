"use server"

import { signIn } from "@/app/utils/auth"
import { redirect } from "next/navigation"
import { isRedirectError } from "next/dist/client/components/redirect-error"

export async function handleEmailSignIn(formData: FormData) {
  const email = formData.get("email") as string

  try {
    await signIn("nodemailer", {
      email,
      callbackUrl: "/dashboard",
      redirect: false,
    })
  } catch (error) {
    // Re-throw redirect errors (they're not actual errors)
    if (isRedirectError(error)) {
      throw error
    }
    console.error("Sign in error:", error)
    throw error
  }

  // Move redirect outside try/catch to avoid catching redirect "error"
  redirect("/verify")
}
