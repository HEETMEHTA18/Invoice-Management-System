import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookMarked,
  FileText,
  GitBranch,
  Layers3,
  LayoutTemplate,
  ListTree,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { docPages, getDocsPath } from "@/lib/docs-config";
import { getDocsRouteContext } from "@/lib/docs-routing";

export const metadata: Metadata = {
  title: "Invonotify Docs",
  description:
    "Central documentation hub for setup, architecture, workflows, and the software requirements specification.",
};

const highlights = [
  {
    icon: LayoutTemplate,
    title: "Structured like a docs portal",
    description:
      "The docs now live under a dedicated documentation shell with a sidebar, page routing, and per-page navigation.",
  },
  {
    icon: GitBranch,
    title: "Backed by repo sources",
    description:
      "README, architecture docs, workflow diagrams, and the SRS are rendered directly from the markdown files already in this repository.",
  },
  {
    icon: ShieldCheck,
    title: "Built into the same app",
    description:
      "The documentation stays at `/docs` on the current deployment, so users do not leave the main Vercel site.",
  },
];

const readingOrder = [
  {
    title: "Start with Getting Started",
    description:
      "Use the README-backed page for project overview, setup, environment variables, deployment, and troubleshooting.",
    slug: "getting-started",
  },
  {
    title: "Move to Architecture",
    description:
      "Read the system narrative to understand the frontend, route handlers, data layer, integrations, and scaling guidance.",
    slug: "architecture",
  },
  {
    title: "Open Workflows",
    description:
      "Review the major system flows including auth, invoice reads, dashboard analytics, reminders, and deployment runtime paths.",
    slug: "workflows",
  },
  {
    title: "Reference the SRS",
    description:
      "Use the SRS for formal requirements, actors, interfaces, and non-functional expectations.",
    slug: "srs",
  },
];

const docsFacts = [
  "Primary docs URL: `https://invonotify.vercel.app/docs`",
  "Landing-page Docs buttons now point to `/docs`",
  "Architecture, workflows, and SRS are available as separate pages",
  "Content is sourced from the `Documentation/` folder and `README.md`",
];

export default async function DocsPage() {
  const { routeMode } = await getDocsRouteContext();

  return (
    <div className="space-y-8 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <section className="overflow-hidden rounded-[32px] border border-[#d8dee5] bg-[linear-gradient(135deg,#ffffff_0%,#eef3f7_55%,#f6f8fa_100%)] p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_340px]">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-[#d8dee5] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7c8f]">
              Documentation Hub
            </span>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-[#102033] sm:text-5xl">
                Product docs, workflows, and the full SRS in one place.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#425467]">
                This section is now organized like a real documentation portal:
                dedicated pages, sidebar navigation, source-backed content, and
                routing that works directly under `/docs` on the current site.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-[#102033] text-white hover:bg-[#1f3249]">
                <Link href={getDocsPath("getting-started", routeMode)}>
                  Open getting started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={getDocsPath("srs", routeMode)}>Read the SRS</Link>
              </Button>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {docsFacts.map((fact) => (
                <div
                  key={fact}
                  className="rounded-2xl border border-[#d8dee5] bg-white/80 px-4 py-3 text-sm leading-7 text-[#425467]"
                >
                  {fact}
                </div>
              ))}
            </div>
          </div>

          <Card className="border-[#cfd8e2] bg-[#102033] py-0 text-white">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-2xl">Documentation map</CardTitle>
              <CardDescription className="text-white/70">
                Open any major section directly from here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-6">
              {docPages.map((page) => (
                <Link
                  key={page.slug}
                  href={getDocsPath(page.slug, routeMode)}
                  className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:bg-white/10"
                >
                  <p className="font-semibold text-white">{page.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    {page.summary}
                  </p>
                </Link>
              ))}

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/75">
                Use this docs home as the single public entry point. Every page
                in this section lives under `/docs`.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {highlights.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="border-[#d8dee5] bg-white">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3f7] text-[#102033]">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-[#425467]">
              {description}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="border-[#d8dee5] bg-white">
          <CardHeader>
            <CardTitle className="text-3xl">Documentation library</CardTitle>
            <CardDescription className="text-base leading-7 text-[#425467]">
              Choose a page below to read the complete content from the repo.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {docPages.map((page) => (
              <Link
                key={page.slug}
                href={getDocsPath(page.slug, routeMode)}
                className="rounded-3xl border border-[#d8dee5] bg-[#f5f7fa] p-5 transition-colors hover:border-[#102033] hover:bg-white"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#102033] text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#102033]">
                      {page.title}
                    </p>
                    <p className="text-sm text-[#5d7084]">{page.category}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#425467]">
                  {page.description}
                </p>
                <p className="mt-4 font-mono text-xs text-[#5d7084]">
                  {page.sourcePath}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="border-[#d8dee5] bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">How to read this docs site</CardTitle>
            <CardDescription className="text-base leading-7 text-[#425467]">
              A simple order helps users and reviewers get context quickly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {readingOrder.map((step, index) => (
              <div
                key={step.slug}
                className="rounded-2xl border border-[#d8dee5] bg-[#f5f7fa] px-4 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7c8f]">
                  Step {index + 1}
                </p>
                <Link
                  href={getDocsPath(step.slug, routeMode)}
                  className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-[#102033] hover:text-[#0b63b6]"
                >
                  {step.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-2 text-sm leading-7 text-[#425467]">
                  {step.description}
                </p>
              </div>
            ))}

            <div className="rounded-2xl border border-[#d8dee5] bg-[#102033] px-4 py-4 text-sm leading-7 text-white/80">
              The main pages are `/docs`, `/docs/getting-started`,
              `/docs/architecture`, `/docs/workflows`, and `/docs/srs`.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border-[#d8dee5] bg-white">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3f7] text-[#102033]">
              <BookMarked className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">What is covered</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-[#425467]">
            Setup instructions, environment variables, deployment notes,
            authentication flow, analytics flow, reminder automation, and
            formal requirements are all included.
          </CardContent>
        </Card>

        <Card className="border-[#d8dee5] bg-white">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3f7] text-[#102033]">
              <Layers3 className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">How it is organized</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-[#425467]">
            The sidebar stays visible across docs pages, each document gets its
            own route, and the detail pages include page-level navigation plus
            an on-page section index.
          </CardContent>
        </Card>

        <Card className="border-[#d8dee5] bg-white">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3f7] text-[#102033]">
              <ListTree className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Where content comes from</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-[#425467]">
            `README.md` powers getting started, `Documentation/architecture/*`
            powers the architecture and workflows pages, and `Documentation/SRS.md`
            powers the requirements page.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
