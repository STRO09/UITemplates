"use client";
import { useEffect, useRef } from "react";
import { CompanyPortalLayout } from "@/components/layout/CompanyPortalLayout";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const zoom = 14;
  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: "streets-v4",
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
    });
  }, [tokyo.lng, tokyo.lat, zoom]);
  return (
    <CompanyPortalLayout>
      <div ref={mapContainer} className="w-[90%] h-[90%] my-7 ms-15" />
    </CompanyPortalLayout>
  );
}
