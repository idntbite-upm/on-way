"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { HeatmapPoint } from "@/types/analytics";

interface PurchaseDensityMapProps {
	points: HeatmapPoint[];
}

export default function PurchaseDensityMap({
	points,
}: PurchaseDensityMapProps) {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loader = new Loader({
			apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
			version: "weekly",
			libraries: ["visualization"],
		});

		loader.load().then(() => {
			if (mapRef.current) {
				const map = new google.maps.Map(mapRef.current, {
					zoom: 13,
					center: { lat: 33.5945144, lng: -7.6200284 },
					mapTypeId: "satellite",
				});

				const heatmapData = points.map((point) => ({
					location: new google.maps.LatLng(point.lat, point.lng),
					weight: point.weight ?? 1,
				}));

				const heatmap = new google.maps.visualization.HeatmapLayer({
					data: heatmapData,
					map: map,
				});

				// Configure heatmap settings
				heatmap.set("radius", 20);
				heatmap.set("opacity", 0.8);
			}
		});
	}, [points]);

	return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}
