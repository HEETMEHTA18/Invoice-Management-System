import "server-only";

import { headers } from "next/headers";

import type { DocsRouteMode } from "@/lib/docs-config";

export async function getDocsRouteContext(): Promise<{
  routeMode: DocsRouteMode;
  isDocsHost: boolean;
  siteBaseUrl: string | null;
}> {
  const headerStore = await headers();
  const forwardedHost = headerStore.get("x-forwarded-host");
  const hostHeader = forwardedHost ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "https";
  const hostname = hostHeader?.split(":")[0]?.toLowerCase() ?? null;
  const isDocsHost = Boolean(hostname?.startsWith("docs."));

  return {
    routeMode: isDocsHost ? "subdomain" : "path",
    isDocsHost,
    siteBaseUrl:
      isDocsHost && hostname
        ? `${protocol}://${hostname.replace(/^docs\./, "")}`
        : null,
  };
}
