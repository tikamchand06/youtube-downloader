"use client";

import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/app/subcomponents/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant='ghost'
      onClick={toggleTheme}
      className='dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-300 dark:text-yellow-400'
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
