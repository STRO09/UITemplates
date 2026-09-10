"use client";

import { useEffect, useState } from "react";

export function useCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;

        setLocation([longitude, latitude]);
      },
      (error) => {
        setError(error.message);
      },
    );
  }, []);

  return {
    location,
    error,
  };
}
