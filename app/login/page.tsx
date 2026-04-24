import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleEmailSignIn } from "./actions";
import { SubmitButton } from "@/components/SubmitButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login({
    searchParams,
}: {
    searchParams?: Promise<{ error?: string; success?: string }>;
}) {
    const session = await auth();

    if (session?.user) {
        redirect("/dashboard");
    }

    const params = (await searchParams) || {};

    const errorMessages = {
        signin_failed: "Invalid email or password",
        db_unavailable: "Database connection error. Please try again later.",
        invalid_email: "Please enter a valid business email format.",
    };

    const successMessages = {
        registered: "Account created successfully! Please login.",
    };

    const error = params.error;
    const success = params.success;
    const errorMessage = error ? errorMessages[error as keyof typeof errorMessages] : null;
    const successMessage = success ? successMessages[success as keyof typeof successMessages] : null;

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <Link href="/" className="mb-2 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email and password to login.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                            {errorMessage}
                        </div>
                    )}
                    <form action={handleEmailSignIn}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="demo@example.com"
                                    pattern="^(?=.{6,254}$)(?=.{1,64}@)(?=[A-Za-z])[A-Za-z0-9._%+-]*[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.[A-Za-z]{2,}$"
                                    title="Use a valid email address like name@company.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="******"
                                    required
                                />
                            </div>
                            <SubmitButton text="Login" />
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="underline">
                            Register
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
