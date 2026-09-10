"use client";

import { useEffect, useRef } from "react";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";

export function LocationSearch({ placeholder, onLocationSelect }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const geocoder = new GeocodingControl({
      placeholder,
    });

    geocoder.on("pick", (event) => {
      if (!event.feature) return;

      const coordinates = event.feature.geometry.coordinates[0];

      onLocationSelect?.(coordinates);
    });

    containerRef.current.appendChild(geocoder);

    return () => {
      geocoder.remove?.();
    };
  }, [placeholder, onLocationSelect]);

  return <div ref={containerRef} />;
}
