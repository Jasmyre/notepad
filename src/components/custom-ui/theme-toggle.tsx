import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      aria-label="Toggle theme"
      className="cursor-pointer"
      onClick={toggleTheme}
      size="icon"
      variant="outline"
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300" />
        ) : (
          <Moon className="h-4 w-4 rotate-0 scale-100 transition-all duration-300" />
        )
      ) : (
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
