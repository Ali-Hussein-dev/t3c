import { useModelsStore } from "@/src/hooks/use-models-store";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { useThreadStore } from "./use-thread-store";
import { generateId } from "ai";
import * as React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const useChatManager = () => {
  const params = useParams<{ threadId: string }>();
  const threadId = params.threadId;

  const selectedModel = useModelsStore((s) => s.model);
  const aiProvider = useModelsStore((s) => s.provider);
  const modelsDetails = useModelsStore((s) => s.modelsDetails);
  const apiKey = useModelsStore((s) => s.apiKeys[aiProvider]);
  const setModel = useModelsStore((s) => s.setModel);

  const thread = useThreadStore((s) => s.getThreadById(threadId));
  const removeThread = useThreadStore((s) => s.remove);
  const insertThread = useThreadStore((s) => s.insert);
  const addMessage = useThreadStore((s) => s.addMessage);
  const hasThread = useThreadStore((s) => s.has(threadId));

  const router = useRouter();
  const [finishedStreaming, setFinishedStreaming] = React.useState(false);

  const modelOptions = Object.entries(
    modelsDetails[selectedModel]?.options || {}
  ).reduce((acc, [key, value]) => {
    acc[key as keyof typeof value] = value.value || value.default;
    return acc;
  }, {} as Record<string, number>);
  const chat = useChat({
    api: "/api/generate",
    body: {
      provider: aiProvider,
      model: selectedModel,
      apiKey,
      options: modelOptions,
    },
    initialMessages: thread?.messages || [],
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
        console.error(error);
      } else {
        toast.error("Something went wrong");
        console.error(error);
      }
    },
    onFinish: () => {
      setFinishedStreaming(true);
    },
  });
  console.info("chat status", chat.status);
  React.useEffect(() => {
    console.log("running useEffect", finishedStreaming);
    if (finishedStreaming) {
      const messageLength = chat.messages.length;
      if (hasThread) {
        console.info("adding user message");

        addMessage({
          threadId,
          message: {
            ...chat.messages[messageLength - 2],
          },
        });
        console.info("adding assistant message");
        addMessage({
          threadId,
          message: {
            ...chat.messages[messageLength - 1],
            provider: aiProvider,
          },
        });
      } else {
        // When user on the chat page without threadId
        const userMessage = chat.messages[0];
        console.info("inserting thread", { userMessage });
        const id = threadId || "thread-" + generateId();

        insertThread({ id, message: userMessage });

        console.info(`adding first assistant message ${aiProvider}`);
        addMessage({
          threadId: id,
          message: {
            ...chat.messages[1],
            provider: aiProvider,
          },
        });
        // maybe push to new thread page
        const searchParams = selectedModel ? `?llm=${selectedModel}` : "";
        console.info("pushing to new thread", `/chat/${id}${searchParams}`);
        router.push(`/chat/${id}${searchParams}`);
      }
      setFinishedStreaming(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedStreaming, chat.messages]);
  ///------------------------------handlers
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    chat.handleSubmit(e);
  };
  const clearMessages = () => {
    chat.setMessages([]);
    if (threadId) {
      removeThread(threadId);
      router.push("/chat");
      toast.success("Thread cleared");
    }
  };

  return {
    llm: selectedModel,
    setLlm: setModel,
    provider: aiProvider,
    chat,
    clearMessages,
    onSubmit,
  };
};
