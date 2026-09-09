import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { start, end } = await request.json();

    const response = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        method: "POST",
        headers: {
          Authorization: process.env.OPENROUTESERVICE_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: [start, end],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get route" },
      { status: 500 }
    );
  }
}