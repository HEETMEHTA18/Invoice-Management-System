import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpenText, ExternalLink } from "lucide-react";

import DocsSidebar from "@/components/docs/DocsSidebar";
import { Button } from "@/components/ui/button";
import { getDocsPath } from "@/lib/docs-config";
import { getDocsRouteContext } from "@/lib/docs-routing";

export default async function DocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { routeMode, siteBaseUrl } = await getDocsRouteContext();
  const siteHref = siteBaseUrl ?? "/";
  const appHref = siteBaseUrl ? `${siteBaseUrl}/register` : "/register";

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#102033]">
      <header className="sticky top-0 z-50 border-b border-[#d8dee5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={getDocsPath("", routeMode)}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#102033] text-white">
              <BookOpenText className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[#102033]">
                Invonotify Docs
              </span>
              <span className="text-xs text-[#6b7c8f]">
                Product, workflows, and requirements
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <a href={siteHref}>
                Main Site
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild className="bg-[#102033] text-white hover:bg-[#1f3249]">
              <a href={appHref}>Open App</a>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl lg:grid-cols-[260px_minmax(0,1fr)]">
        <DocsSidebar routeMode={routeMode} />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
