"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { cn } from "@/lib/utils"

type MarkdownProps = {
  children: string
  className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
