import Link from "next/link";
import { ThemeSelect } from "./theme-select";
//======================================
export function Header() {
  return (
    <header className="h-[8vh] px-2 sm:px-5 flex items-center">
      <nav className="flex justify-between items-center w-full">
        <ul className="grow">
          <li>
            <Link href="/">LLM Playground</Link>
          </li>
          <li></li>
        </ul>
        <ThemeSelect />
      </nav>
    </header>
  );
}
