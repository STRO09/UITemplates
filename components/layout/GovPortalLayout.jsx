'use client';

import { useState } from 'react';

import { GovSidebar } from '@/components/layout/GovSidebar';
import { Header } from './Header';

/**
 * Government portal layout.
 *
 * Handles:
 * - sidebar state
 * - layout spacing
 * - shared dashboard structure
 */
export function GovPortalLayout({ children }) {
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
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <GovSidebar
        isOpen={isOpen}
        onToggle={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main
          className=" min-h-screen transition-all duration-300"
          style={{
            marginLeft: isOpen ? '240px' : '60px',
          }}
        >
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
}
