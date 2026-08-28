"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Theme Selector
 *
 *   Allows the user to explicitly choose:
 *     System
 *     Light
 *     Dark
 *
 */
export function ThemeSelector({ className, ...props }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-lg border border-border bg-background p-1",
        className,
      )}
      {...props}
    >
      <ThemeOption
        active={theme === "system"}
        onClick={() => setTheme("system")}
        icon={Monitor}
        label="System"
      />

      <ThemeOption
        active={theme === "light"}
        onClick={() => setTheme("light")}
        icon={Sun}
        label="Light"
      />

      <ThemeOption
        active={theme === "dark"}
        onClick={() => setTheme("dark")}
        icon={Moon}
        label="Dark"
      />
    </div>
  );
}

/**
 * Individual theme option.
 *
 * Kept internal to ThemeSelector because consumers generally
 * shouldn't need to know how the selector is implemented.
 */
function ThemeOption({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm transition-colors",
        active
          ? "bg-surface text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
      aria-label={`Use ${label.toLowerCase()} theme`}
      aria-pressed={active}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
