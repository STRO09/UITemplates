'use client';

import { useState } from 'react';

import { CompanySidebar } from './CompanySidebar';
import { Header } from './Header';

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
export function CompanyPortalLayout({
  children,
}) {
  /**
   * Sidebar expanded/collapsed state.
   */
  const [isOpen, setIsOpen] =
    useState(true);

  /**
   * Toggle sidebar visibility.
   */
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <CompanySidebar
        isOpen={isOpen}
        onToggle={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main
          className="min-h-screen transition-all duration-300"
          style={{
            /**
             * Match content offset
             * with sidebar width.
             */
            marginLeft: isOpen
              ? '240px'
              : '60px',
          }}
        >
          {/* Shared portal header */}
          <Header />

          {/* Route/page content */}
          {children}
        </main>
      </div>
    </div>
  );
}