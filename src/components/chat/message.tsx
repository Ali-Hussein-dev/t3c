import { Markdown } from "../markdown";
import { Message as MessageAI } from "@ai-sdk/react";
//======================================
export function Message({
  role,
  content,
}: {
  role: MessageAI["role"];
  content: string;
}) {
  if (role === "user") {
    return (
      <div className="flex items-center gap-2 justify-end w-full">
        <div className="bg-muted p-2 rounded-lg px-3 prose dark:prose-invert rounded-tr-none">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full prose dark:prose-invert max-w-full">
      <Markdown>{content}</Markdown>
    </div>
  );
}
