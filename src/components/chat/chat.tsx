"use client";
import { ModelKey, modelsMap } from "@/src/constants/models";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { LllmSelect } from "@/src/components/chat/llms-select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { ModelInfo } from "@/src/components/chat/model-info";
import { MdClear } from "react-icons/md";
import { useChatManager } from "@/src/hooks/use-chat-manager";
import { Message } from "@/src/components/chat/message";
import { Info, SendIcon, StopCircle } from "lucide-react";
import { LlmConfigDropdownMenu } from "./llm-config-drowpdown-menu";
import { useChat } from "@ai-sdk/react";
import * as React from "react";
import { useQueryState } from "nuqs";
import { Card, CardHeader, CardTitle } from "../ui/card";

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
    <div className="fixed bottom-0 right-0 sm:pb-2 pt-8 w-full items-center flex justify-center bg-gradient-to-t from-background via-background/40 to-transparent">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 px-2 py-3 sm:py-6 w-full sm:px-4 border-y sm:border border-border border-dashed bg-background max-w-4xl mx-auto sm:rounded-lg pb-4 shadow-lg"
      >
        <Textarea
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded-md min-h-[38px] flex-1 resize-none scroll-m-2 focus:ring-0 focus:outline-none pr-9 field-sizing-content border-none max-h-[25vh] sm:max-h-[35vh] md:max-h-[50vh]"
          onKeyDown={handleKeyDown}
        />
        {status === "streaming" ? (
          <Button onClick={stop} type="button">
            <StopCircle />
          </Button>
        ) : (
          <Button disabled={status === "submitted" || status === "error"}>
            <SendIcon />
          </Button>
        )}
      </form>
    </div>
  );
};

//======================================
export function Chat() {
  const { llm, setLlm, chat, clearMessages } = useChatManager();
  const [currentModel, setModel] = useQueryState("llm");
  const { messages } = chat;
  React.useEffect(() => {
    setLlm((currentModel as ModelKey) || "gpt-4o-mini");
  }, []);
  const onSelectModel = (model: ModelKey) => {
    setModel(model);
    setLlm(model);
  };
  return (
    <>
      <section className="mx-auto max-w-4xl w-full grow rounded-lg border-border border border-dashed flex flex-col mb-28">
        <div className="pb-2 flex justify-between items-center gap-4 border-b border-border border-dashed p-2 sm:p-4">
          <LllmSelect llm={llm} onSelectModel={onSelectModel} />
          {/* {status} */}
          <LlmConfigDropdownMenu llm={llm} />
        </div>
        {llm && messages.length < 1 && (
          <div className="flex gap-2 flex-col p-2 sm:p-4 py-6 sm:py-8 grow">
            <div className="">
              <ModelInfo {...modelsMap[llm]} />
            </div>
            <Card className="bg-transparent border-none">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-2 font-medium">
                  <Info className="size-4" />
                  <div>Press H to show chat history</div>
                </CardTitle>
              </CardHeader>
              {/* <CardContent>
              </CardContent> */}
            </Card>
          </div>
        )}
        {messages.length > 0 && (
          <div className="px-2 sm:px-4 py-6 grow">
            <Tabs defaultValue="chat">
              <TabsList>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="json">JSON</TabsTrigger>
              </TabsList>
              <TabsContent
                value="chat"
                className="p-2 sm:p-4 bg-secondary rounded-lg"
              >
                <div className="space-y-3">
                  {messages.map((message, i) => (
                    <div key={i}>
                      <Message role={message.role} content={message.content} />
                    </div>
                  ))}
                  {chat.status === "submitted" && (
                    <div className="w-full">Thinking...</div>
                  )}
                </div>
                {["ready", "error"].includes(chat.status) && (
                  <div className="flex justify-end pt-4">
                    <Button variant="outline" onClick={clearMessages} size="sm">
                      <MdClear /> Clear Messages
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent
                value="json"
                className="p-2 sm:p-4 bg-secondary rounded-lg"
              >
                <code>
                  <pre className="text-wrap p-2 border rounded-md border-border">
                    {JSON.stringify(messages || {}, null, 2)}
                  </pre>
                </code>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </section>
      <PromptArea chat={chat} />
    </>
  );
}
