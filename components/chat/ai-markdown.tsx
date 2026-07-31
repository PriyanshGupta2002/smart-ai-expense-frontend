import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AiMarkdownRendererProps {
  content: string;
}

const AiMarkdownRenderer = ({ content }: AiMarkdownRendererProps) => {
  return (
    <div className="min-w-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-3 leading-7 last:mb-0">{children}</p>
          ),

          ul: ({ children }) => (
            <ul className="my-3 list-disc space-y-1.5 pl-5">{children}</ul>
          ),

          ol: ({ children }) => (
            <ol className="my-3 list-decimal space-y-1.5 pl-5">{children}</ol>
          ),

          li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,

          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),

          h1: ({ children }) => (
            <h1 className="mb-3 mt-6 text-xl font-semibold tracking-tight first:mt-0">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-lg font-semibold tracking-tight first:mt-0">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-5 font-semibold first:mt-0">{children}</h3>
          ),

          // --------------------------------
          // Table
          // --------------------------------

          table: ({ children }) => (
            <div className="my-4 w-full overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[650px] border-collapse text-sm">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-muted/50">{children}</thead>
          ),

          tbody: ({ children }) => (
            <tbody className="divide-y">{children}</tbody>
          ),

          tr: ({ children }) => (
            <tr className="transition-colors hover:bg-muted/30">{children}</tr>
          ),

          th: ({ children }) => (
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="px-4 py-3 align-top">{children}</td>
          ),

          // --------------------------------
          // Blockquote
          // --------------------------------

          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-2 border-primary pl-4 text-muted-foreground">
              {children}
            </blockquote>
          ),

          // --------------------------------
          // Horizontal rule
          // --------------------------------

          hr: () => <hr className="my-6 border-border" />,

          // --------------------------------
          // Links
          // --------------------------------

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4"
            >
              {children}
            </a>
          ),

          // --------------------------------
          // Code
          // --------------------------------

          code: ({ children }) => (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              {children}
            </code>
          ),

          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-xl bg-muted p-4 text-sm">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AiMarkdownRenderer;
