"use client";

import { SidebarItem } from "./SidebarItem";
import { SidebarNavigationProvider } from "./SidebarNavigationContext";

export function SidebarSubmenu({ items = [] }) {
  return (
    <SidebarNavigationProvider mode="popup">
      <div>
        {items.map((item) => (
          <SidebarItem key={item.id ?? item.href ?? item.label} item={item} />
        ))}
      </div>
    </SidebarNavigationProvider>
  );
}
