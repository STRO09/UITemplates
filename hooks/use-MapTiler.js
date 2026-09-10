"use client";

import { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";

maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

export function useMapTiler({
  center,
  zoom,
  style = "streets-v4",
  onStartLocationSelect,
  onDestinationSelect,
}) {
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

    const startGeocoder = new GeocodingControl({
      placeholder: "Starting location",
    });

    const destinationGeocoder = new GeocodingControl({
      placeholder: "Destination",
    });

    map.current.addControl(startGeocoder, "top-left");
    map.current.addControl(destinationGeocoder, "top-left");

    startGeocoder.on("pick", (event) => {
      console.log("Selected start location:", event);
      onStartLocationSelect?.(event);
    });

    destinationGeocoder.on("pick", (event) => {
      console.log("Selected destination:", event);

      onDestinationSelect?.(event);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return {
    mapContainer,
    map,
  };
}
