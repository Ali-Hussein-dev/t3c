import { Chat } from "@/src/components/chat/chat";
import { Header } from "@/src/components/common/header";
import * as React from "react";
// add seo metadata, here
//======================================
export default function ChatPage() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="min-h-[92vh] py-4 flex flex-col w-full overflow-hidden px-2">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Chat />
        </React.Suspense>
      </main>
    </div>
  );
}
