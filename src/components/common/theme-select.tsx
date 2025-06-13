"use client";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "../ui/button";
//======================================
export function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="icon"
      variant="outline"
      aria-label="Theme"
      type="button"
    >
      {theme === "dark" ? <LuSun /> : <LuMoon />}
    </Button>
  );
}
