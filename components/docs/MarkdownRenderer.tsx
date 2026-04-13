import type { ReactNode } from "react";

import { slugifyText } from "@/lib/docs-config";

type MarkdownRendererProps = {
  markdown: string;
};

type MarkdownBlock =
  | { type: "heading"; level: number; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "code"; language: string; content: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "divider" };

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const blocks = parseMarkdown(markdown);

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

function parseMarkdown(markdown: string) {
  const lines = markdown.split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      blocks.push({ type: "divider" });
      index += 1;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      const text = headingMatch[2].trim();

      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text,
        id: slugifyText(text),
      });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({
        type: "code",
        language,
        content: codeLines.join("\n"),
      });
      continue;
    }

    if (
      line.includes("|") &&
      index + 1 < lines.length &&
      isTableDivider(lines[index + 1].trim())
    ) {
      const headers = splitTableRow(line);
      const rows: string[][] = [];
      index += 2;

      while (index < lines.length && lines[index].includes("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }

      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, "").trim());
        index += 1;
      }

      blocks.push({ type: "unordered-list", items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, "").trim());
        index += 1;
      }

      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const paragraphLines = [trimmed];
    index += 1;

    while (index < lines.length) {
      const nextLine = lines[index];
      const nextTrimmed = nextLine.trim();

      if (
        !nextTrimmed ||
        /^#{1,6}\s+/.test(nextTrimmed) ||
        /^(-{3,}|\*{3,})$/.test(nextTrimmed) ||
        nextTrimmed.startsWith("```") ||
        /^\s*[-*]\s+/.test(nextLine) ||
        /^\s*\d+\.\s+/.test(nextLine) ||
        (nextLine.includes("|") &&
          index + 1 < lines.length &&
          isTableDivider(lines[index + 1].trim()))
      ) {
        break;
      }

      paragraphLines.push(nextTrimmed);
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

function renderBlock(block: MarkdownBlock, index: number) {
  switch (block.type) {
    case "heading":
      return renderHeading(block, index);
    case "paragraph":
      return (
        <p key={index} className="text-base leading-8 text-[#334457]">
          {renderInline(block.text, `paragraph-${index}`)}
        </p>
      );
    case "unordered-list":
      return (
        <ul
          key={index}
          className="list-disc space-y-3 pl-6 text-base leading-8 text-[#334457]"
        >
          {block.items.map((item, itemIndex) => (
            <li key={`${index}-${itemIndex}`}>
              {renderInline(item, `ul-${index}-${itemIndex}`)}
            </li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol
          key={index}
          className="list-decimal space-y-3 pl-6 text-base leading-8 text-[#334457]"
        >
          {block.items.map((item, itemIndex) => (
            <li key={`${index}-${itemIndex}`}>
              {renderInline(item, `ol-${index}-${itemIndex}`)}
            </li>
          ))}
        </ol>
      );
    case "code":
      return (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-[#d8dee5] bg-[#102033]"
        >
          <div className="border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            {block.language || "Code"}
          </div>
          <pre className="overflow-x-auto px-4 py-5 text-sm leading-7 text-white">
            <code>{block.content}</code>
          </pre>
        </div>
      );
    case "table":
      return (
        <div
          key={index}
          className="overflow-x-auto rounded-2xl border border-[#d8dee5] bg-white"
        >
          <table className="min-w-full divide-y divide-[#e2e8ef] text-left text-sm">
            <thead className="bg-[#f5f7f9] text-[#102033]">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} className="px-4 py-3 font-semibold">
                    {renderInline(header, `table-head-${index}-${header}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f5] text-[#334457]">
              {block.rows.map((row, rowIndex) => (
                <tr key={`${index}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${index}-${rowIndex}-${cellIndex}`}
                      className="px-4 py-3 align-top"
                    >
                      {renderInline(
                        cell,
                        `table-cell-${index}-${rowIndex}-${cellIndex}`
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "divider":
      return <hr key={index} className="border-[#e2e8ef]" />;
    default:
      return null;
  }
}

function renderHeading(
  block: Extract<MarkdownBlock, { type: "heading" }>,
  index: number
) {
  if (block.level === 1) {
    return (
      <h1
        key={index}
        id={block.id}
        className="scroll-mt-28 text-4xl font-semibold tracking-tight text-[#102033]"
      >
        {renderInline(block.text, `heading-${index}`)}
      </h1>
    );
  }

  if (block.level === 2) {
    return (
      <h2
        key={index}
        id={block.id}
        className="scroll-mt-28 border-t border-[#e2e8ef] pt-8 text-3xl font-semibold text-[#102033] first:border-t-0 first:pt-0"
      >
        {renderInline(block.text, `heading-${index}`)}
      </h2>
    );
  }

  if (block.level === 3) {
    return (
      <h3
        key={index}
        id={block.id}
        className="scroll-mt-28 text-2xl font-semibold text-[#102033]"
      >
        {renderInline(block.text, `heading-${index}`)}
      </h3>
    );
  }

  return (
    <h4
      key={index}
      id={block.id}
      className="scroll-mt-28 text-xl font-semibold text-[#102033]"
    >
      {renderInline(block.text, `heading-${index}`)}
    </h4>
  );
}

function splitTableRow(row: string) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableDivider(value: string) {
  return /^\|?[\s:-|]+\|?$/.test(value) && value.includes("-");
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const matches = Array.from(
    text.matchAll(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g)
  );

  if (matches.length === 0) {
    return [text];
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;

  matches.forEach((match, index) => {
    const token = match[0];
    const start = match.index ?? 0;

    if (start > cursor) {
      nodes.push(text.slice(cursor, start));
    }

    if (token.startsWith("`")) {
      nodes.push(
        <code
          key={`${keyPrefix}-code-${index}`}
          className="rounded-md bg-[#eef2f6] px-1.5 py-0.5 font-mono text-[0.95em] text-[#102033]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("**")) {
      nodes.push(
        <strong
          key={`${keyPrefix}-strong-${index}`}
          className="font-semibold text-[#102033]"
        >
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

      if (linkMatch) {
        const href = linkMatch[2];
        const isExternal = /^https?:\/\//.test(href);

        nodes.push(
          <a
            key={`${keyPrefix}-link-${index}`}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="font-medium text-[#0b63b6] underline decoration-[#94bce2] underline-offset-4 hover:text-[#084e8f]"
          >
            {linkMatch[1]}
          </a>
        );
      }
    }

    cursor = start + token.length;
  });

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}
