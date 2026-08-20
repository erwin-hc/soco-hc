"use client"

import { createElement } from "react"
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer"
import { cn } from "@/lib/utils"

type StrapiBlocksProps = {
  content: BlocksContent
  className?: string
}

export function StrapiBlocks({ content, className }: StrapiBlocksProps) {
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none", className)}>
      <BlocksRenderer
        content={content}
        blocks={{
          heading: ({ children, level }) =>
            createElement(
              `h${Math.min(level, 6)}`,
              { className: "font-bold uppercase" },
              children,
            ),
          paragraph: ({ children }) => <p className="text-pretty leading-relaxed">{children}</p>,
          list: ({ children, format }) =>
            format === "ordered" ? (
              <ol className="list-decimal pl-5">{children}</ol>
            ) : (
              <ul className="list-disc pl-5">{children}</ul>
            ),
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-muted pl-4 italic">{children}</blockquote>
          ),
          code: ({ children }) => (
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">{children}</pre>
          ),
          link: ({ children, url }) => (
            <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
              {children}
            </a>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <u>{children}</u>,
          strikethrough: ({ children }) => <s>{children}</s>,
          code: ({ children }) => <code className="rounded bg-muted px-1 py-0.5 text-sm">{children}</code>,
        }}
      />
    </div>
  )
}