"use client";
import Link from "next/link";
import { ThemeSelect } from "./theme-select";
import { urls } from "@/src/constants/urls";
import { useAuth } from "@/src/components/auth/auth-provider";
import { Button } from "@/src/components/ui/button";
//======================================
export function Header() {
  const { session, signOut } = useAuth();
  return (
    <header className="h-[8vh] px-2 sm:px-5 flex items-center">
      <nav className="flex justify-between items-center w-full">
        <Link
          href="/"
          className="font-bold tracking-tight text-background px-2 py-1 rounded-tl-lg rounded-br-lg bg-primary"
        >
          T3C
        </Link>
        <ul className="grow flex gap-2 items-center px-4 justify-end">
          <li>
            {session?.user ? (
              <Button variant="outline" onClick={signOut}>
                Log out
              </Button>
            ) : (
              <Button asChild>
                <Link href={urls.login}>Login</Link>
              </Button>
            )}
          </li>
        </ul>
        <ThemeSelect />
      </nav>
    </header>
  );
}
