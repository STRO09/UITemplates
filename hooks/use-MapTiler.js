"use client";

import { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";

maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

export function useMapTiler({ center, zoom, style = "streets-v4" }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style,
      center,
      zoom,
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [center, zoom, style]);

  return {
    mapContainer,
    map,
  };
}
