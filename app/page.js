"use client";

import { useEffect } from "react";
import { CompanyPortalLayout } from "@/components/layout/CompanyPortalLayout";
import { useMapTiler } from "@/hooks/use-MapTiler";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function Home() {
  const tokyo = [139.753, 35.6844];

  const { mapContainer, map } = useMapTiler({
    center: tokyo,
    zoom: 14,
  });

  useEffect(() => {
    map.current.on("load", async () => {
      const start = [139.6917, 35.6895];
      const end = [139.7006, 35.6894];

      const response = await fetch("/api/routes/openRouteService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start, end }),
      });

      const route = await response.json();

      map.current.addSource("route", {
        type: "geojson",
        data: route,
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#2563eb",
          "line-width": 6,
        },
      });

      if (route.bbox) {
        map.current.fitBounds(
          [
            [route.bbox[0], route.bbox[1]],
            [route.bbox[2], route.bbox[3]],
          ],
          {
            padding: 50,
          },
        );
      }
    });
  }, [map]);

  return (
    <CompanyPortalLayout>
      <div ref={mapContainer} className="w-[90%] h-[90%] my-7 ms-15" />
    </CompanyPortalLayout>
  );
}
