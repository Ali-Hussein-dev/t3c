import { Header } from "@/src/components/common/header";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="h-[92vh] py-4 flex flex-col w-full overflow-hidden px-2 items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 md:text-6xl md:mb-6 tracking-tighter">
          Welcome to T3C
        </h1>
        <Button variant={"default"} asChild className="gap-2" size="lg">
          <Link href="/chat">
            Start Chatting
            <ArrowRight />
          </Link>
        </Button>
      </main>
    </div>
  );
}
