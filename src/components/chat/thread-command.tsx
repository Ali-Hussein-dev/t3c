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
type Thread = {
  id: string;
  //   slug: string;
  title: string;
  createdAt: Date;
  messages: Message[];
};

const ThreadItem = ({
  thread,
}: {
  thread: Pick<Thread, "id" | "title" | "createdAt">;
}) => {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="w-full">
        <Link href={`/chat/${thread.id}`}>
          <div className="font-medium">{thread.title}</div>
          <div className="text-xs text-muted-foreground">
            {thread.createdAt.toLocaleString()}
          </div>
        </Link>
      </div>
    </div>
  );
};
const threadsSample = [
  {
    id: "1",
    title: "Foo 1",
    createdAt: new Date(),
    messages: [],
  },
  {
    id: "2",
    title: "Boo 2",
    createdAt: new Date(),
    messages: [],
  },
];
//======================================
export function ThreadsCommand({
  threads = threadsSample,
}: {
  threads?: Thread[];
}) {
  const { openCommand: open, setOpenCommand: setOpen } = useCommand();
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search chat history..." className="max-w-sm" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Chat History">
          {threads.map((o) => (
            <CommandItem
              key={o.id}
              onSelect={() => {
                setOpen(false);
              }}
            >
              <ThreadItem thread={o} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
