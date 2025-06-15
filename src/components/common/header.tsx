import Link from "next/link";
import { ThemeSelect } from "./theme-select";
import { urls } from "@/src/constants/urls";
//======================================
export function Header() {
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
            <Link href={urls.login}>Login</Link>
          </li>
        </ul>
        <ThemeSelect />
      </nav>
    </header>
  );
}
