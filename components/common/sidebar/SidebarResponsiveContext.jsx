"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { BREAKPOINTS } from "@/constants/breakpoints";

const SidebarResponsiveContext = createContext("desktop");

export function SidebarResponsiveProvider({ children }) {
  const [mode, setMode] = useState("desktop");

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${BREAKPOINTS.mobile - 1}px)`,
    );

    const updateMode = () => {
      setMode(mediaQuery.matches ? "mobile" : "desktop");
    };

    updateMode();
    mediaQuery.addEventListener("change", updateMode);

    return () => {
      mediaQuery.removeEventListener("change", updateMode);
    };
  }, []);

  return (
    <SidebarResponsiveContext.Provider value={mode}>
      {children}
    </SidebarResponsiveContext.Provider>
  );
}

export function useSidebarResponsive() {
  return useContext(SidebarResponsiveContext);
}
