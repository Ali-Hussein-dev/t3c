"use client";
import { Message } from "ai";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import * as React from "react";
import { useCommand } from "./command-provider";
import { useThreadStore } from "@/src/hooks/use-thread-store";
import { useQueryState } from "nuqs";
import { formatDate } from "date-fns";
import { FiPlus } from "react-icons/fi";
import { generateId } from "ai";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

type Thread = {
  id: string;
  //   slug: string;
  title: string;
  createdAt: string;
  messages: Message[];
};

const ThreadItem = ({
  thread,
}: {
  thread: Pick<Thread, "id" | "title" | "createdAt">;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-semibold">{thread.title}</div>
        <div className="text-xs text-muted-foreground">
          {formatDate(new Date(thread.createdAt), "yyyy-MM-dd")}
        </div>
      </div>
    </div>
  );
};
export function ThreadsCombobox({
  clearMessages,
}: {
  clearMessages: () => void;
}) {
  const { openCommand: open, setOpenCommand: setOpen } = useCommand();
  const threads = useThreadStore((s) => s.threads);
  const [selectedModel] = useQueryState("llm");
  const router = useRouter();
  return (
    <>
      <div className="flex items-center max-w-4xl mx-auto justify-between mb-4 w-full gap-4 sticky top-0 "></div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search actions, chat history..."
          className="max-w-sm"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions" className="">
            <CommandItem
              onSelect={() => {
                const id = "thread-" + generateId();
                router.push(`/chat/${id}?llm=${selectedModel}`);
                setOpen(false);
              }}
            >
              <FiPlus /> New thread
            </CommandItem>
            <CommandItem
              onSelect={() => {
                clearMessages();
                setOpen(false);
              }}
            >
              <RiDeleteBin6Line /> Delete thread
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Chat History" className="">
            {threads.map((o) => (
              <CommandItem
                key={o.id}
                onSelect={() => {
                  const searchParams = selectedModel
                    ? `?llm=${selectedModel}`
                    : "";
                  router.push(`/chat/${o.id}${searchParams}`);
                  setOpen(false);
                }}
              >
                <ThreadItem thread={o} />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
