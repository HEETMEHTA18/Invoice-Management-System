import Link from "next/link";
import { FileText } from "lucide-react";
import { DashboardLinks } from "../DashboardLink";

export function DashboardSidebar() {
    return (
        <div className="flex h-full flex-col bg-white">
            <div className="flex items-center gap-2 p-6 pb-2">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white font-bold">
                        <FileText className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold">
                        <span className="text-gray-900">IMS</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 space-y-1 px-4 mt-6">
                <DashboardLinks />
            </nav>
        </div>
    );
}
