"use client";

import { FileText, LogOut, LayoutDashboard, Compass } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sidebar, useSidebar } from "../common/sidebar/Sidebar";
import { SidebarNavigation } from "../common/sidebar/SidebarNavigation";
import { SidebarToggle } from "../common/sidebar/SidebarToggle";
import { SidebarItem } from "../common/sidebar/SidebarItem";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/company/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "explore",
    label: "Explore Tenders",
    href: "/company/explore",
    icon: Compass,
  },
  {
    id: "submissions",
    label: "My Submissions",
    href: "/company/submissions",
    icon: FileText,
  },
];

export function CompanySidebar() {
  return (
    <Sidebar className="border-r bg-card">
      <SidebarHeader
        icon={FileText}
        title="Procurement"
        subtitle="Company Portal"
      />

      <SidebarNavigation items={navItems} />

      <SidebarFooter>
        <SidebarItem
          item={{
            id: "switch-role",
            label: "Switch Role",
            href: "/auth",
            icon: LogOut,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

function SidebarHeader({ icon: Icon, title, subtitle, className }) {
  const { open } = useSidebar();
  return (
    <header
      className={cn(
        "relative flex h-16 shrink-0 items-center border-b",
        open ? "gap-3 px-5" : "justify-center",
        className,
      )}
    >
      {Icon && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary">
          <Icon className="h-4 w-4 text-primary-foreground" />
        </div>
      )}

      {open && (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight">
            {title}
          </p>

          {subtitle && (
            <p className="truncate text-[11px] leading-tight text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      )}
      

      <SidebarToggle />
    </header>
  );
}

export function SidebarFooter({ children, className }) {
  return (
    <footer className={cn("mt-auto shrink-0 border-t px-3 py-3", className)}>
      {children}
    </footer>
  );
}
