import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";

import MarkdownRenderer from "@/components/docs/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import {
  docPages,
  getDocIndex,
  getDocsPath,
  type DocsRouteMode,
} from "@/lib/docs-config";
import { getDocContent } from "@/lib/docs";
import { getDocsRouteContext } from "@/lib/docs-routing";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return docPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocContent(slug);

  if (!doc) {
    return {
      title: "Docs",
    };
  }

  return {
    title: `${doc.page.title} | Invonotify Docs`,
    description: doc.page.description,
  };
}

export default async function DocDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocContent(slug);
  const { routeMode } = await getDocsRouteContext();

  if (!doc) {
    notFound();
  }

  const currentIndex = getDocIndex(slug);
  const previousPage = currentIndex > 0 ? docPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex >= 0 && currentIndex < docPages.length - 1
      ? docPages[currentIndex + 1]
      : null;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href={getDocsPath("", routeMode)}>
            <ArrowLeft className="h-4 w-4" />
            Docs Home
          </Link>
        </Button>
        <span className="rounded-full border border-[#d8dee5] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7c8f]">
          {doc.page.category}
        </span>
      </div>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_240px]">
        <article className="min-w-0 rounded-[28px] border border-[#d8dee5] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 rounded-3xl border border-[#d8dee5] bg-[#f5f7fa] p-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#102033] text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6b7c8f]">
                  {doc.page.category}
                </p>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#102033]">
                  {doc.page.title}
                </h1>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#425467]">
              {doc.page.description}
            </p>
            <p className="mt-3 font-mono text-sm text-[#5d7084]">
              Source: {doc.page.sourcePath}
            </p>
          </div>

          <MarkdownRenderer markdown={doc.content} />

          <div className="mt-10 grid gap-4 border-t border-[#e2e8ef] pt-8 md:grid-cols-2">
            <PagerCard
              label="Previous"
              page={previousPage}
              routeMode={routeMode}
              direction="left"
            />
            <PagerCard
              label="Next"
              page={nextPage}
              routeMode={routeMode}
              direction="right"
            />
          </div>
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-24 rounded-[28px] border border-[#d8dee5] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7c8f]">
              On This Page
            </p>
            <nav className="mt-4 space-y-2">
              {doc.headings.length === 0 ? (
                <p className="text-sm text-[#6b7c8f]">No section headings.</p>
              ) : (
                doc.headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block rounded-xl px-3 py-2 text-sm text-[#46586b] transition-colors hover:bg-[#f5f7fa] hover:text-[#102033] ${
                      heading.level === 3 ? "ml-3" : ""
                    }`}
                  >
                    {heading.title}
                  </a>
                ))
              )}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PagerCard({
  label,
  page,
  routeMode,
  direction,
}: {
  label: string;
  page: (typeof docPages)[number] | null;
  routeMode: DocsRouteMode;
  direction: "left" | "right";
}) {
  if (!page) {
    return <div className="hidden md:block" />;
  }

  return (
    <Link
      href={getDocsPath(page.slug, routeMode)}
      className="rounded-3xl border border-[#d8dee5] bg-[#f5f7fa] p-5 transition-colors hover:border-[#102033] hover:bg-white"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7c8f]">
        {label}
      </p>
      <div className="mt-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-[#102033]">{page.title}</p>
          <p className="mt-1 text-sm text-[#4c5f73]">{page.summary}</p>
        </div>
        {direction === "left" ? (
          <ArrowLeft className="h-5 w-5 text-[#102033]" />
        ) : (
          <ArrowRight className="h-5 w-5 text-[#102033]" />
        )}
      </div>
    </Link>
  );
}
