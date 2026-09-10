"use client";

import { useCallback, useState } from "react";

export function useRoute() {
  const [route, setRoute] = useState(null);

  const getRoute = useCallback(async (start, end) => {
    const response = await fetch("/api/routes/openRouteService", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start, end }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "Failed to get route");
    }

    setRoute(data);

    return data;
  }, []);

  return {
    route,
    getRoute,
  };
}
