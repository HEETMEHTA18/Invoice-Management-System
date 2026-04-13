import "server-only";

import { readFile } from "fs/promises";
import path from "path";

import { getDocPage, slugifyText, type DocPageMeta } from "@/lib/docs-config";

export type DocHeading = {
  id: string;
  level: number;
  title: string;
};

export async function getDocContent(slug: string) {
  const page = getDocPage(slug);

  if (!page) {
    return null;
  }

  const rawContent = await readFile(
    path.join(process.cwd(), page.sourcePath),
    "utf8"
  );
  const content = transformDocContent(page, rawContent);

  return {
    page,
    content,
    headings: extractHeadings(content),
  };
}

function transformDocContent(page: DocPageMeta, rawContent: string) {
  let normalized = rawContent.replace(/\r\n/g, "\n");

  normalized = stripLeadingTitle(normalized);

  if (page.slug === "srs") {
    return normalizeSrsMarkdown(normalized);
  }

  if (page.slug === "getting-started") {
    normalized = normalized.replace(
      /\n## Table of Contents[\s\S]*?\n## 1\. Overview\n/,
      "\n## 1. Overview\n"
    );
  }

  return normalized;
}

function extractHeadings(markdown: string) {
  const headings: DocHeading[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);

    if (!match) {
      continue;
    }

    const level = match[1].length;

    if (level > 3) {
      continue;
    }

    const title = match[2].trim();

    headings.push({
      id: slugifyText(title),
      level,
      title,
    });
  }

  return headings;
}

function normalizeSrsMarkdown(content: string) {
  const lines = content.split("\n");
  const output: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      output.push("");
      continue;
    }

    if (/^-{5,}$/.test(trimmed)) {
      output.push("---");
      continue;
    }

    if (trimmed === "SOFTWARE REQUIREMENTS SPECIFICATION") {
      output.push("# Software Requirements Specification");
      continue;
    }

    if (trimmed === "for") {
      continue;
    }

    if (trimmed === "INVOICE MANAGEMENT SYSTEM") {
      output.push("**Project:** Invoice Management System");
      continue;
    }

    if (trimmed === "TABLE OF CONTENTS") {
      output.push("## Table of Contents");
      continue;
    }

    const appendixMatch = trimmed.match(/^(APPENDIX [A-Z]:)\s+(.+)$/i);

    if (appendixMatch) {
      output.push(
        `## ${normalizeHeadingLabel(appendixMatch[1])} ${normalizeHeadingLabel(
          appendixMatch[2]
        )}`
      );
      continue;
    }

    const levelThreeWithBodyMatch = trimmed.match(
      /^(\d+\.\d+\.\d+)\s+([^:]+):\s*(.+)$/
    );

    if (levelThreeWithBodyMatch) {
      output.push(
        `#### ${levelThreeWithBodyMatch[1]} ${normalizeHeadingLabel(
          levelThreeWithBodyMatch[2]
        )}`
      );
      output.push(levelThreeWithBodyMatch[3]);
      continue;
    }

    const levelThreeHeadingMatch = trimmed.match(/^(\d+\.\d+\.\d+)\s+(.+)$/);

    if (levelThreeHeadingMatch) {
      output.push(
        `#### ${levelThreeHeadingMatch[1]} ${normalizeHeadingLabel(
          levelThreeHeadingMatch[2]
        )}`
      );
      continue;
    }

    const levelTwoHeadingMatch = trimmed.match(/^(\d+\.\d+)\s+(.+)$/);

    if (levelTwoHeadingMatch) {
      output.push(
        `### ${levelTwoHeadingMatch[1]} ${normalizeHeadingLabel(
          levelTwoHeadingMatch[2]
        )}`
      );
      continue;
    }

    const levelOneHeadingMatch = trimmed.match(/^(\d+\.)\s+(.+)$/);

    if (
      levelOneHeadingMatch &&
      /^[A-Z][A-Z\s&/()-]+$/.test(levelOneHeadingMatch[2].trim())
    ) {
      output.push(
        `## ${levelOneHeadingMatch[1]} ${normalizeHeadingLabel(
          levelOneHeadingMatch[2]
        )}`
      );
      continue;
    }

    output.push(line);
  }

  return output.join("\n");
}

function normalizeHeadingLabel(value: string) {
  if (/^[A-Z0-9\s&/()-]+$/.test(value)) {
    return value
      .toLowerCase()
      .split(/(\s+|[-/])/)
      .map((part) =>
        /(\s+|[-/])/.test(part)
          ? part
          : part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join("");
  }

  return value;
}

function stripLeadingTitle(content: string) {
  return content.replace(/^#\s+.+\n+/, "");
}
