"use client";

import { CompanySidebar } from "./CompanySidebar";
import { Header } from "../common/layout/Header";
import { ThemeSelector } from "../common/ThemeSelector";
import { ThemeToggle } from "../common/ThemeToggle";
import { Bell } from "lucide-react";

export function CompanyPortalLayout({ children }) {
  return (
    <div className="flex h-dvh w-full overflow-auto">
      {/* Full-height sidebar */}
      <CompanySidebar />

      {/* Header + Main */}
      <div className="flex flex-1 flex-col">
        <Header
          className="shrink-0 border-b bg-card"
          contentClassName="h-16 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-xl font-semibold">Procurement Platform</h2>

          <div className="flex items-center gap-4">
            <ThemeSelector />
            <ThemeToggle />
            <Bell className="h-5 w-5" />
          </div>
        </Header>

        <main className="min-h-0 min-w-0 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
