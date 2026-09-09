import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/lib/toast/config";

/**
 * Primary application font.
 *
 * WHAT:
 *   Loads Geist through Next.js and exposes it as a CSS variable. Add whatever fonts to use here.
 *
 * WHY:
 *   next/font handles font loading and optimization for us.
 *   The CSS variable lets globals.css decide how the font is used
 *   throughout the design system.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Global metadata.
 *
 * Replace these values with the actual site's title and description.
 */
export const metadata = {
  title: "UI Templates",
  description: "Next js Template",
};

/**
 * Root layout for the entire Next.js application.
 *
 * RESPONSIBILITIES:
 *
 * 1. Load global fonts.
 * 2. Load globals.css.
 * 3. Provide theme management through next-themes.
 * 4. Define the root HTML/body structure.
 *
 *
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistSans.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
