import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ModelKey, ModelDetails, modelsMap } from "@/src/constants/models";

type ChatStore = {
  /**
   * Selected model
   */
  model: ModelKey;
  setModel: (llm: ModelKey) => void;
  provider: string;
  setProvider: (provider: string) => void;
  modelsDetails: { [key in ModelKey]?: ModelDetails };
  // use for customizing llm configs
  setModelsDetails: (llmObject: { [key in ModelKey]: ModelDetails }) => void;
  apiKeys: { [providerKey in string]: string };
  setApiKeys: (provider: string, apiKey: string) => void;
};

export const useModelsStore = create<ChatStore>()(
  persist(
    (set) => ({
      model: "gpt-4o-mini",
      setModel: (llm: ModelKey) => {
        return set((state) => ({
          model: llm,
          provider: modelsMap[llm].providerId,
          modelsDetails: { ...state.modelsDetails, [llm]: modelsMap[llm] },
        }));
      },

      provider: "openai",
      setProvider: (provider: string) => set({ provider }),

      modelsDetails: {
        "gpt-4o-mini": modelsMap["gpt-4o-mini"],
      },
      setModelsDetails: (llmObject: { [key in ModelKey]: ModelDetails }) => {
        return set(() => ({
          modelsDetails: { ...llmObject },
        }));
      },
      apiKeys: {},
      setApiKeys: (provider: string, apiKey: string) =>
        set((state) => ({ apiKeys: { ...state.apiKeys, [provider]: apiKey } })),
    }),
    {
      name: "chat-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
