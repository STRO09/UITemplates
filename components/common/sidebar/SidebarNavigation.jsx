"use client";

import { SidebarItem } from "./SidebarItem";

export function SidebarNavigation({ items = [] }) {
  return (
    <nav>
      {items.map((item) => (
        <SidebarItem key={item.id ?? item.href ?? item.label} item={item} />
      ))}
    </nav>
  );
}
