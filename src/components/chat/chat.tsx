"use client";
import { ModelKey, modelsMap } from "@/src/constants/models";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { LllmSelect, logosIcons } from "@/src/components/chat/llms-select";
import { ModelInfo } from "@/src/components/chat/model-info";
import { useChatManager } from "@/src/hooks/use-chat-manager";
import { Message } from "@/src/components/chat/message";
import { Calendar, Plus, StopCircle, Trash } from "lucide-react";
import { LlmConfigDropdownMenu } from "./llm-config-drowpdown-menu";
import { useChat } from "@ai-sdk/react";
import * as React from "react";
import { useQueryState } from "nuqs";
import { useThreadStore } from "@/src/hooks/use-thread-store";
import { ThreadsCombobox } from "./thread-command";
import { formatDate } from "date-fns";
import { CommandProvider } from "./command-provider";
import { useParams, useRouter } from "next/navigation";
import { VscArrowSmallUp } from "react-icons/vsc";
import { cn } from "@/src/lib/utils";
import { BsCommand } from "react-icons/bs";
import { Badge } from "@/src/components/ui/badge";
import { generateId } from "ai";
import { useModelsStore } from "@/src/hooks/use-models-store";

const PromptArea = ({
  chat,
  onSubmit,
}: {
  chat: ReturnType<typeof useChat>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const { status, input, setInput, stop } = chat;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if (isGenerating) return;
    if (e.key === "Enter" && !e.shiftKey) {
      // sendMessage?.(editor.getText());
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      // e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
    }
  };
  return (
    <div className="fixed bottom-0 right-0 pt-8 w-full items-center flex justify-center">
      <div className="p-2 pb-3 rounded-t-lg bg-secondary/60 backdrop-blur-xl w-full max-w-4xl">
        <form
          onSubmit={onSubmit}
          className="flex gap-2 px-2 py-3 sm:py-6 w-full sm:px-4 border border-border border-dashed bg-background max-w-4xl mx-auto rounded-lg pb-4 shadow-lg"
        >
          <Textarea
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-md min-h-[38px] flex-1 resize-none scroll-m-2 focus:ring-0 focus:outline-none pr-9 field-sizing-content border-none max-h-[25vh] sm:max-h-[35vh] md:max-h-[50vh] bg-input/30"
            onKeyDown={handleKeyDown}
          />
          <div>
            {status === "streaming" ? (
              <Button onClick={stop} type="button" size="icon">
                <StopCircle />
              </Button>
            ) : (
              <Button
                disabled={status === "submitted" || status === "error"}
                size="icon"
              >
                <VscArrowSmallUp className="size-6" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

//======================================
export function Chat() {
  const params = useParams<{ threadId: string }>();
  const threadId = params.threadId;
  const { llm, setLlm, chat, clearMessages, onSubmit } = useChatManager();
  const aiProvider = useModelsStore((s) => s.provider);
  const apiKey = useModelsStore((s) => s.apiKeys[aiProvider]);
  const [currentModel, setModel] = useQueryState("llm");
  const { messages } = chat;

  React.useEffect(() => {
    // Set initial model of model from query param
    setLlm((currentModel as ModelKey) || "gpt-4o-mini");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectModel = (model: ModelKey) => {
    if (model && model !== llm) {
      setModel(model);
      setLlm(model);
    }
  };
  const thread = useThreadStore((s) => s.getThreadById(threadId));
  const router = useRouter();
  return (
    <div className="mx-auto max-w-4xl w-full grow flex flex-col">
      <CommandProvider>
        <ThreadsCombobox
          clearMessages={messages.length > 0 ? clearMessages : () => {}}
        />
      </CommandProvider>
      <section className="rounded-lg grow flex flex-col mb-28 group">
        <div className="pb-2 flex justify-between items-center gap-4 border rounded-sm bg-muted/20 border-border border-dashed p-2 sm:p-4">
          <LllmSelect llm={llm} onSelectModel={onSelectModel} />
          <div className="flex justify-end gap-1">
            {messages.length > 0 && (
              <Button variant="ghost" size="icon" onClick={clearMessages}>
                <Trash />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const id = "thread-" + generateId();
                router.push(`/chat/${id}?llm=${llm}`);
              }}
            >
              <Plus />
            </Button>
            <LlmConfigDropdownMenu llm={llm} />
          </div>
        </div>
        {messages.length > 0 && (
          <div className="px-2 sm:px-4 py-6 grow space-y-4">
            {/* {JSON.stringify(thread?.messages, null, 2)} */}
            {messages.map((message, i) => {
              const provider =
                message.role == "assistant"
                  ? thread?.messages[i]?.provider
                  : undefined;
              const Logo = provider
                ? logosIcons[provider as keyof typeof logosIcons]
                : null;
              return (
                <div key={i} className={cn(message.role !== "user" && "pb-2")}>
                  <div
                    className={cn(
                      message.role == "assistant" &&
                        "justify-start flex items-start gap-2"
                    )}
                  >
                    {Logo && (
                      <Badge
                        variant="outline"
                        className="rounded-full border-border p-0 size-6 mt-1"
                      >
                        <Logo />
                      </Badge>
                    )}
                    <Message role={message.role} content={message.content} />
                  </div>
                </div>
              );
            })}
            {chat.status === "submitted" && (
              <div className="w-full">Thinking...</div>
            )}
          </div>
        )}
        {llm && (messages.length < 1 || !apiKey) && (
          <div className="flex gap-2 flex-col py-2 grow md:py-6">
            <div className="">
              <ModelInfo {...modelsMap[llm]} />
              <div className="flex items-center gap-1 justify-center pt-4">
                <Badge variant="secondary" className="py-2">
                  Chat history
                  <BsCommand className="h-6" /> + K
                </Badge>
              </div>
            </div>
          </div>
        )}
        {thread && messages.length > 0 && (
          <div className="opacity-90 group-hover:opacity-100 px-3.5 py-3 transition-all duration-300 border-t border-border border-dashed flex gap-2 justify-start items-center">
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <Calendar className="size-4" />
              {formatDate(new Date(thread.createdAt), "dd.MMM.yyyy / HH:mm")}
            </div>
          </div>
        )}
      </section>
      <PromptArea chat={chat} onSubmit={onSubmit} />
    </div>
  );
}
