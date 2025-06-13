import { useChatStore } from "@/src/hooks/use-chat-store";
import { useChat } from "@ai-sdk/react";
import { useLocalStorage } from "@mantine/hooks";
import { toast } from "sonner";

export const useChatManager = () => {
  const model = useChatStore((s) => s.model);
  const setModel = useChatStore((s) => s.setModel);
  const aiProvider = useChatStore((s) => s.provider);
  const modelsDetails = useChatStore((s) => s.modelsDetails);
  const [apiKey] = useLocalStorage<string>({
    key: `apikey-${aiProvider}`,
  });
  const options = Object.entries(modelsDetails[model]?.options || {}).reduce(
    (acc, [key, value]) => {
      acc[key as keyof typeof value] = value.value || value.default;
      return acc;
    },
    {} as Record<string, number>
  );
  const chat = useChat({
    api: "/api/generate",
    body: {
      provider: aiProvider,
      model,
      apiKey,
      options,
    },
    // initialInput: "Hi there",
    initialMessages: [],
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
        console.error(error);
      } else {
        toast.error("Something went wrong");
        console.error(error);
      }
    },
    // onFinish: (data) => {
    //   // setData(data);
    //   toast.success("Hope you like it", {
    //     closeButton: true,
    //   });
    // },
  });
  const clearMessages = () => {
    chat.setMessages([]);
  };

  return {
    llm: model,
    setLlm: setModel,
    provider: aiProvider,
    chat,
    clearMessages,
  };
};
