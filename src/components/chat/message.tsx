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
        <div className="bg-card p-2 rounded-lg px-3">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <Markdown>{content}</Markdown>
    </div>
  );
}
