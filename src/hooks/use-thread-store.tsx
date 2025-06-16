import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";
import { generateId, Message } from "ai";

interface AIThreadMessage extends Message {
  provider?: string;
}
type AIThread = {
  id: string;
  title: string;
  createdAt: string;
  messages: AIThreadMessage[];
};

type ThreadStore = {
  threads: AIThread[];
  /**
   * Upserts a thread
   * @param thread
   */
  insert: ({ id, message }: { id?: string; message: AIThreadMessage }) => void;
  /**
   * Adds a message to a thread
   * @param threadId
   * @param message
   */
  addMessage: ({
    threadId,
    message,
  }: {
    threadId: string;
    message: AIThreadMessage;
  }) => void;
  /**
   * Removes a thread
   * @param threadId
   */
  remove: (threadId: string) => void;
  /**
   * Checks if a thread exists
   * @param threadId
   */
  has: (threadId: string) => boolean;
  /**
   * Gets a thread by id
   * @param threadId
   */
  getThreadById: (threadId: string | null) => AIThread | null;
};

export const idbStorage = {
  getItem: async (name: string) => {
    const value = await get(name);
    return value ?? null;
  },
  setItem: async (name: string, value: any) => {
    await set(name, value);
  },
  removeItem: async (name: string) => {
    await del(name);
  },
};

export const useThreadStore = create<ThreadStore>()(
  persist(
    (set, get) => ({
      threads: [],
      has: (threadId) => get().threads.some((thread) => thread.id === threadId),
      insert: ({ id, message }: { id?: string; message: AIThreadMessage }) =>
        set((state) => {
          id = id || "thread-" + generateId();
          const createdAt = new Date().toISOString();
          const newThread = {
            id,
            title:
              message.content.split(" ").slice(0, 10).join(" ") || "New Thread",
            createdAt,
            messages: [message],
          };
          return {
            threads: [newThread, ...state.threads],
          };
        }),
      addMessage: ({
        threadId,
        message,
      }: {
        threadId: string;
        message: AIThreadMessage;
      }) =>
        set((state) => ({
          threads: state.threads.map((thread) =>
            thread.id === threadId
              ? { ...thread, messages: [...thread.messages, message] }
              : thread
          ),
        })),
      remove: (threadId) =>
        set((state) => ({
          threads: state.threads.filter((thread) => thread.id !== threadId),
        })),
      getThreadById: (threadId) =>
        get().threads.find((thread) => thread.id === threadId) || null,
    }),
    {
      name: "ai-threads",
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
