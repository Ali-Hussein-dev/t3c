import * as React from "react";
import { Chat } from "@/src/components/chat/chat";
import { Header } from "@/src/components/common/header";

//======================================
export default function ChatThreadPage() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="min-h-[92vh] py-4 flex flex-col w-full overflow-hidden px-2">
        <Chat />
      </main>
    </div>
  );
}
