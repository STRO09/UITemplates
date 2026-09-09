"use client";

import { createContext, useContext } from "react";

const SidebarNavigationContext = createContext("sidebar");

export function SidebarNavigationProvider({ mode, children }) {
  return (
    <SidebarNavigationContext.Provider value={mode}>
      {children}
    </SidebarNavigationContext.Provider>
  );
}

export function useSidebarNavigation() {
  return useContext(SidebarNavigationContext);
}
