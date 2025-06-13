import { Chat } from "@/src/components/chat/chat";
import * as React from "react";
// add seo metadata, here
//======================================
export default function ChatPage() {
  return (
    <div className="min-h-screen relative">
      <header className="h-[8vh]"></header>
      <main className="min-h-[92vh] py-4 flex flex-col w-full overflow-hidden px-2">
        <Chat />
      </main>
    </div>
  );
}
