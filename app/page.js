"use client";

import { useState, useEffect, useCallback } from "react";
import { CompanyPortalLayout } from "@/components/layout/CompanyPortalLayout";
import { useMapTiler } from "@/hooks/use-MapTiler";
import { useRoute } from "@/hooks/use-MapRoute";
import { useCurrentLocation } from "@/hooks/use-currentLocation";
import { drawRoute } from "@/utils/mapRoute";
import "@maptiler/sdk/dist/maptiler-sdk.css";
const tokyo = [139.753, 35.6844];

export default function Home() {
  const [startLocation, setStartLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const { location, error } = useCurrentLocation();
  const { route, getRoute } = useRoute();

  const handleStartLocationSelect = useCallback((event) => {
    if (!event.feature) return;
    const coordinates = event.feature.center;
    console.log("Start coordinates:", coordinates);
    setStartLocation(coordinates);
  }, []);

  const handleDestinationSelect = useCallback((event) => {
    if (!event.feature) return;
    const coordinates = event.feature.center;
    console.log("Destination coordinates:", coordinates);
    setDestination(coordinates);
  }, []);

  const { mapContainer, map } = useMapTiler({
    center: tokyo,
    zoom: 14,
    onStartLocationSelect: handleStartLocationSelect,
    onDestinationSelect: handleDestinationSelect,
  });

  useEffect(() => {
    if (!location) return;
    console.log("Current location:", location);
    console.log("Location error:", error);
    setStartLocation((current) => current ?? location);
    if (!map.current) return;

    map.current.setCenter(location);
  }, [location]);

  useEffect(() => {
    if (!route || !map.current) return;
    console.log("Drawing route on map:", route);
    drawRoute(map.current, route);
  }, [route]);

  useEffect(() => {
    if (!startLocation || !destination) return;

    console.log("Fetching route:", {
      start: startLocation,
      end: destination,
    });

    getRoute(startLocation, destination);
  }, [startLocation, destination, getRoute]);

  // useEffect(() => {
  //   if (!map.current) return;

  //   map.current.on("load", async () => {
  //     const start = [139.6917, 35.6895];
  //     const end = [139.7006, 35.6894];

  //     const route = await getRoute(start, end);

  //     map.current.addSource("route", {
  //       type: "geojson",
  //       data: route,
  //     });

  //     map.current.addLayer({
  //       id: "route",
  //       type: "line",
  //       source: "route",
  //       paint: {
  //         "line-color": "#2563eb",
  //         "line-width": 6,
  //       },
  //     });

  //     if (route.bbox) {
  //       map.current.fitBounds(
  //         [
  //           [route.bbox[0], route.bbox[1]],
  //           [route.bbox[2], route.bbox[3]],
  //         ],
  //         {
  //           padding: 50,
  //         },
  //       );
  //     }
  //   });
  // }, [map, getRoute]);

  return (
    <CompanyPortalLayout>
      <div ref={mapContainer} className="w-[90%] h-[90%] my-7 ms-15" />
    </CompanyPortalLayout>
  );
}
