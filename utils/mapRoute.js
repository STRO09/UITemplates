export function drawRoute(map, route) {
  if (!map || !route) return;

  if (map.getSource("route")) {
    map.getSource("route").setData(route);
  } else {
    map.addSource("route", {
      type: "geojson",
      data: route,
    });

    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      paint: {
        "line-color": "#2563eb",
        "line-width": 6,
      },
    });
  }

  if (route.bbox) {
    map.fitBounds(
      [
        [route.bbox[0], route.bbox[1]],
        [route.bbox[2], route.bbox[3]],
      ],
      {
        padding: 50,
      },
    );
  }
}
