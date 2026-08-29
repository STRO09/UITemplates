import { useState } from "react";

/**
 * Cursor-based pagination for APIs using next/previous cursors.
 */
export function useCursorPagination({
  initialCursor = null,
} = {}) {
  const [cursor, setCursor] = useState(initialCursor);
  const [nextCursor, setNextCursor] = useState(null);
  const [previousCursors, setPreviousCursors] = useState([]);

  const hasNextPage = Boolean(nextCursor);
  const hasPreviousPage = previousCursors.length > 0;

  const goNext = () => {
    if (!nextCursor) return;

    setPreviousCursors((current) => [
      ...current,
      cursor,
    ]);

    setCursor(nextCursor);
    setNextCursor(null);
  };

  const goPrevious = () => {
    if (!hasPreviousPage) return;

    setPreviousCursors((current) => {
      const next = [...current];
      next.pop();
      return next;
    });

    setCursor((current) => {
      const previous = [...previousCursors];
      return previous[previous.length - 1] ?? null;
    });

    setNextCursor(null);
  };

  const update = ({ nextCursor: newNextCursor }) => {
    setNextCursor(newNextCursor ?? null);
  };

  const reset = () => {
    setCursor(null);
    setNextCursor(null);
    setPreviousCursors([]);
  };

  return {
    cursor,
    nextCursor,

    hasNextPage,
    hasPreviousPage,

    goNext,
    goPrevious,
    update,
    reset,
  };
}