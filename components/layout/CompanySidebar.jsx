"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Compass,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Sidebar, useSidebar } from "../common/sidebar/Sidebar";

const navItems = [
  {
    label: "Dashboard",
    href: "/company/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Explore Tenders",
    href: "/company/explore",
    icon: Compass,
  },
  {
    label: "My Submissions",
    href: "/company/submissions",
    icon: FileText,
  },
];

export function CompanySidebar() {
  return (
    <Sidebar defaultOpen className="border-r bg-card">
      <CompanySidebarContent />
    </Sidebar>
  );
}

function CompanySidebarContent() {
  const { open, setOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <div className="relative flex h-full flex-col">
      {/* Toggle */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="absolute -right-3.5 top-5 z-50 flex h-7 w-7 items-center justify-center rounded-full border bg-card shadow-sm transition-colors hover:bg-muted"
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      >
        {open ? (
          <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </button>

      {/* Logo */}
      <div
        className={cn(
          "flex h-14 shrink-0 items-center overflow-hidden border-b transition-all duration-200",
          open ? "gap-3 px-5" : "justify-center",
        )}
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary">
          <FileText className="h-4 w-4 text-primary-foreground" />
        </div>

        {open && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              Procurement
            </p>

            <p className="text-[11px] leading-tight text-muted-foreground">
              Company Portal
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav
        className={cn(
          "flex-1 space-y-0.5 overflow-y-auto py-3",
          open ? "px-3" : "px-2",
        )}
      >
        {open && (
          <p className="select-none px-2 pb-2 pt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            Navigation
          </p>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-9 items-center rounded-lg text-sm font-medium transition-colors",
                open ? "gap-3 px-3" : "justify-center px-2",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />

              {open && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={cn("shrink-0 border-t py-3", open ? "px-3" : "px-2")}>
        <Link
          href="/auth"
          className={cn(
            "flex h-9 w-full items-center rounded-lg text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            open ? "gap-2.5 px-2.5" : "justify-center",
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />

          {open && <span>Switch Role</span>}
        </Link>
      </div>
    </div>
  );
}
