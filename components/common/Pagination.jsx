"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable pagination controls.
 *
 * Supports navigation via href or callbacks.
 */
export function Pagination({
  currentPage,
  totalPages,

  hasNextPage,
  hasPreviousPage,

  nextHref,
  previousHref,

  getPageHref,
  onPageChange,
  onNext,
  onPrevious,

  className,
  previousLabel = "Previous",
  nextLabel = "Next",

  ...props
}) {
  if (
    !hasNextPage &&
    !hasPreviousPage &&
    (!totalPages || totalPages <= 1)
  ) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex items-center justify-between gap-4",
        className,
      )}
      {...props}
    >
      {previousHref ? (
        <PaginationLink
          href={previousHref}
          disabled={!hasPreviousPage}
          direction="previous"
        >
          {previousLabel}
        </PaginationLink>
      ) : (
        <PaginationButton
          onClick={onPrevious}
          disabled={!hasPreviousPage}
          direction="previous"
        >
          {previousLabel}
        </PaginationButton>
      )}

      <PaginationPages
        currentPage={currentPage}
        totalPages={totalPages}
        getPageHref={getPageHref}
        onPageChange={onPageChange}
      />

      {nextHref ? (
        <PaginationLink
          href={nextHref}
          disabled={!hasNextPage}
          direction="next"
        >
          {nextLabel}
        </PaginationLink>
      ) : (
        <PaginationButton
          onClick={onNext}
          disabled={!hasNextPage}
          direction="next"
        >
          {nextLabel}
        </PaginationButton>
      )}
    </nav>
  );
}

/**
 * Pagination link for URL-based navigation.
 */
function PaginationLink({
  href,
  disabled,
  direction,
  children,
}) {
  const Icon =
    direction === "previous"
      ? ChevronLeft
      : ChevronRight;

  return (
    <Link
      href={disabled ? "#" : href}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
        }
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition-colors",
        "text-foreground hover:bg-surface",
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
      )}
    >
      {direction === "previous" && (
        <Icon className="h-4 w-4" />
      )}

      {children}

      {direction === "next" && (
        <Icon className="h-4 w-4" />
      )}
    </Link>
  );
}

/**
 * Pagination button for state-based navigation.
 */
function PaginationButton({
  onClick,
  disabled,
  direction,
  children,
}) {
  const Icon =
    direction === "previous"
      ? ChevronLeft
      : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition-colors",
        "text-foreground hover:bg-surface",
        "disabled:pointer-events-none disabled:opacity-50",
      )}
    >
      {direction === "previous" && (
        <Icon className="h-4 w-4" />
      )}

      {children}

      {direction === "next" && (
        <Icon className="h-4 w-4" />
      )}
    </button>
  );
}

/**
 * Page numbers for offset-based pagination.
 */
function PaginationPages({
  currentPage,
  totalPages,
  onPageChange,
  getPageHref,
  className,
}) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(
    currentPage,
    totalPages,
  );

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        className,
      )}
    >
      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-muted-foreground"
            aria-hidden="true"
          >
            …
          </span>
        ) : getPageHref ? (
          <Link
            key={page}
            href={getPageHref(page)}
            aria-current={
              page === currentPage ? "page" : undefined
            }
            className={cn(
              "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm transition-colors",
              page === currentPage
                ? "bg-primary text-white"
                : "text-foreground hover:bg-surface",
            )}
          >
            {page}
          </Link>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            aria-current={
              page === currentPage ? "page" : undefined
            }
            className={cn(
              "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm transition-colors",
              page === currentPage
                ? "bg-primary text-white"
                : "text-foreground hover:bg-surface",
            )}
          >
            {page}
          </button>
        ),
      )}
    </div>
  );
}

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  if (currentPage <= 4) {
    return [
      1,
      2,
      3,
      4,
      5,
      "ellipsis",
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}