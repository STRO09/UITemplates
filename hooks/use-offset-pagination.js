import { useMemo, useState } from "react";

/**
 * Page-based pagination for APIs using page/limit or offset/limit. used for client side fetches.
 */
export function useOffsetPagination({
  totalItems = 0,
  initialPage = 1,
  initialLimit = 10,
} = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / limit),
  );

  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const range = useMemo(() => {
    if (totalItems === 0) {
      return { start: 0, end: 0 };
    }

    return {
      start: (page - 1) * limit + 1,
      end: Math.min(page * limit, totalItems),
    };
  }, [page, limit, totalItems]);

  const goToPage = (nextPage) => {
    setPage(
      Math.min(
        Math.max(nextPage, 1),
        totalPages,
      ),
    );
  };

  const next = () => {
    if (hasNextPage) {
      setPage((current) => current + 1);
    }
  };

  const previous = () => {
    if (hasPreviousPage) {
      setPage((current) => current - 1);
    }
  };

  const changeLimit = (nextLimit) => {
    setLimit(nextLimit);
    setPage(1);
  };

  const reset = () => {
    setPage(1);
  };

  return {
    page,
    limit,
    totalItems,
    totalPages,

    hasNextPage,
    hasPreviousPage,

    range,

    goToPage,
    next,
    previous,
    changeLimit,
    reset,
  };
}