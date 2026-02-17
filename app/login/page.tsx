import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { handleEmailSignIn, handleGoogleSignIn } from "./actions";
import { auth } from "@/app/utils/auth";
import { redirect } from "next/navigation";
import { SubmitButton } from "../components/SubmitButtom";

export default async function Login({
    searchParams,
}: {
    searchParams: Promise<{ verify?: string; error?: string }>
}) {
    const session = await auth()
    if (session?.user) {
        redirect("/dashboard")
    }

    const params = await searchParams
    const isVerifying = params?.verify === "true"
    const errorMessage =
        params?.error === "db_unavailable"
            ? "Sign-in is temporarily unavailable because the database connection failed. Check DATABASE_URL and Neon status, then try again."
            : params?.error === "signin_failed"
                ? "Sign-in failed. Please try again."
                : null

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        {isVerifying
                            ? "Check your email for the magic link to sign in."
                            : "Enter your email to receive a magic link."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {errorMessage ? (
                        <p className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {errorMessage}
                        </p>
                    ) : null}
                    {!isVerifying && (
                        <form action={handleEmailSignIn}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="demo@example.com"
                                        required
                                    />
                                </div>
                                <SubmitButton />
                            </div>
                        </form>
                    )}

                    {!isVerifying && (
                        <div className="mt-4">
                            <div className="relative mb-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                                </div>
                            </div>
                            <form action={handleGoogleSignIn}>
                                <Button variant="outline" type="submit" className="w-full gap-2">
                                    <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                    </svg>
                                    Sign in with Google
                                </Button>
                            </form>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
