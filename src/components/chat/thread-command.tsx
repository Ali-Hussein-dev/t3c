"use client";
import { Message } from "ai";
import Link from "next/link";
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
import { Button } from "../ui/button";
import { FiPlus } from "react-icons/fi";
import { generateId } from "ai";
import { useRouter } from "next/navigation";
import { useModelsStore } from "@/src/hooks/use-models-store";

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
//======================================
const NewThread = () => {
  const id = "thread-" + generateId();
  const selectedModel = useModelsStore((s) => s.model);
  return (
    <Button variant="outline" className="gap-1" asChild>
      <Link href={`/chat/${id}?llm=${selectedModel}`}>
        <FiPlus /> New thread
      </Link>
    </Button>
  );
};
export function ThreadsCombobox() {
  const { openCommand: open, setOpenCommand: setOpen } = useCommand();
  const threads = useThreadStore((s) => s.threads);
  const [selectedModel] = useQueryState("llm");
  const router = useRouter();
  return (
    <>
      <div className="flex items-center max-w-4xl mx-auto justify-between mb-4 w-full gap-4 sticky top-0 ">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between border-0 bg-transparent dark:bg-transparent grow"
          onClick={() => setOpen(!open)}
        >
          Press H to open chat history
        </Button>

        <NewThread />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search chat history..."
          className="max-w-sm"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Chat History" className="space-y-3">
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
