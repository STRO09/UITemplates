"use client";

import { useState } from "react";
import { CompanySidebar } from "./CompanySidebar";
import { Sidebar } from "../common/sidebar/Sidebar";
import { Header } from "../common/layout/Header";
import { ThemeSelector } from "../common/ThemeSelector";
import { ThemeToggle } from "../common/ThemeToggle";
import { Bell } from "lucide-react";

/**
 * Company portal layout.
 *
 * Handles:
 * - sidebar state
 * - shared dashboard structure
 * - layout spacing
 * - responsive content shifting
 *
 * USE CASES:
 * - company dashboards
 * - bidder portals
 * - procurement management systems
 */
export function CompanyPortalLayout({ children }) {
  /**
   * Sidebar expanded/collapsed state.
   */
  const [isOpen, setIsOpen] = useState(true);

  /**
   * Toggle sidebar visibility.
   */
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Shared portal header */}
      <Header
        className="sticky top-0 z-40 border-b bg-card"
        contentClassName="h-16 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-xl font-semibold">Procurement Platform</h2>

        <div className="flex items-center gap-4">
          <ThemeSelector />
          <ThemeToggle />
          <Bell className="h-5 w-5" />
        </div>
      </Header>

      <div className="flex min-h-0 flex-1">
        <CompanySidebar />

        <main className="min-w-0 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
