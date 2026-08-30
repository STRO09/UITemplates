"use client";

import { useEffect, useState } from "react";

/**
 * Returns a value after it has stopped changing
 * for the specified delay.
 */
export function useDebouncer(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}