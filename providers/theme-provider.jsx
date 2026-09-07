/**
 * Theme Provider
 *
 * Wraps next-themes' provider for the application.
 * Makes the current theme and theme-changing functionality
 * available to every client component underneath it.
 * next-themes adds/removes the theme class from <html>.
 * globals.css then uses that class to switch our design tokens.
 *
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
