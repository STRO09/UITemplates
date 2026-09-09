"use client";

import { SidebarItem } from "./SidebarItem";
import { SidebarNavigationProvider } from "./SidebarNavigationContext";

export function SidebarSubmenu({ items = [], mode="sidebar" }) {
  return (
    <SidebarNavigationProvider mode={mode}>
      <div>
        {items.map((item) => (
          <SidebarItem key={item.id ?? item.href ?? item.label} item={item} />
        ))}
      </div>
    </SidebarNavigationProvider>
  );
}
