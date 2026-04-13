'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  docsSidebarSections,
  getDocsPath,
  type DocsRouteMode,
} from "@/lib/docs-config";

type DocsSidebarProps = {
  routeMode: DocsRouteMode;
};

export default function DocsSidebar({ routeMode }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r border-[#d8dee5] bg-[#fbfcfd] lg:block">
      <div className="sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto px-4 py-6">
        {docsSidebarSections.map((section) => (
          <div key={section.title} className="mb-8">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7c8f]">
              {section.title}
            </p>

            <nav className="space-y-1">
              {section.items.map((item) => {
                const href = getDocsPath(item.slug, routeMode);
                const isActive =
                  pathname === href ||
                  pathname === getDocsPath(item.slug, "path") ||
                  pathname === getDocsPath(item.slug, "subdomain");

                return (
                  <Link
                    key={item.title}
                    href={href}
                    className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-[#102033] text-white"
                        : "text-[#4b5d70] hover:bg-white hover:text-[#102033]"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
