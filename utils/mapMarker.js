import * as maptilersdk from "@maptiler/sdk";

export function addMarker(map, id, coordinates, color) {
  if (!map || !coordinates) return;

  map.__markers ??= {};

  map.__markers[id]?.remove();

  const marker = new maptilersdk.Marker({ color })
    .setLngLat(coordinates)
    .addTo(map);

  map.__markers[id] = marker;
}
