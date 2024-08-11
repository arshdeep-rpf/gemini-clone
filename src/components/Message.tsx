import { IMessage } from "@/types/message";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";

export const Message = memo(function Message({
  content,
  role,
}: {
  content: string;
  role: IMessage["role"];
}) {
  return (
    <div className="flex items-start gap-5 animate-fadeIn">
      <img
        className="rounded-full w-8 h-8"
        src={role === "system" ? "/gemini_svg.svg" : "/user.jpg"}
      />
      <div className="w-full overflow-hidden">
        <ReactMarkdown
          className={"flex flex-col gap-2"}
          components={{
            // @ts-ignore
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language =
                match && match[1] !== "jsx" ? match[1] : "javascript";

              console.log({ inline, match });

              return !inline && match ? (
                <div className="py-2 overflow-auto">
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    // @ts-ignore
                    style={docco}
                    language={language}
                    PreTag="div"
                    {...props}
                  />
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
          children={content.replace(/\\n/g, "\n")}
        />
      </div>
    </div>
  );
});
