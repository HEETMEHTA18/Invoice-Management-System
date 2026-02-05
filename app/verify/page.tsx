import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Verify() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 bg-gray-50">
            <Card className="w-full max-w-md shadow-sm">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-blue-50">
                        <Mail className="size-12 text-blue-500" />
                    </div>
                    <CardTitle className="text-2xl font-semibold mt-6">
                        Check your Email
                    </CardTitle>
                    <CardDescription className="text-center text-gray-500 mt-2">
                        We have sent a verification link to your email address.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
                        <div className="flex items-center justify-center gap-2">
                            <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                            <p className="text-sm font-medium text-yellow-700">Be sure to check your spam folder!</p>
                        </div>
                    </div>
                    <Link href="/">
                        <Button variant="outline" className="w-full mt-2">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Homepage
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}