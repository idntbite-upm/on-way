"use client";

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { io } from "socket.io-client";
import { Line } from "react-chartjs-2";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

// Interfaces remain the same
interface OrderLocation {
	lat: number;
	lng: number;
	timestamp: string;
}

interface OrderData {
	orderId: string;
	status: string;
	location: OrderLocation;
	trackingHistory: Array<{
		location: OrderLocation;
		status: string;
		timestamp: string;
	}>;
}

// Live Marker Component
const LiveMarker = ({ location }: { location: OrderLocation }) => {
	const markerRef = useRef<L.Marker>(null);
	const map = useMap();

	useEffect(() => {
		if (markerRef.current) {
			const newPos = new L.LatLng(location.lat, location.lng);
			markerRef.current.setLatLng(newPos);
			map.setView(newPos, map.getZoom());
		}
	}, [location, map]);

	return (
		<Marker position={[location.lat, location.lng]} ref={markerRef}>
			<Popup>
				Current Location
				<br />
				{new Date(location.timestamp).toLocaleString()}
			</Popup>
		</Marker>
	);
};

const TrackingPage = () => {
	const [orderId, setOrderId] = useState("");
	const [orderData, setOrderData] = useState<OrderData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [locations, setLocations] = useState<OrderLocation[]>([]);
	const [currentLocation, setCurrentLocation] = useState<OrderLocation | null>(
		null,
	);

	useEffect(() => {
		const socket = io(
			process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3800",
		);

		socket.on("connect", () => {
			console.log("Connected to socket server");
		});

		if (orderId) {
			socket.emit("join-tracking", orderId);

			socket.on("initial-data", (data: OrderData) => {
				setOrderData(data);
				setLocations(data.trackingHistory.map((h) => h.location));
				setCurrentLocation(data.location);
			});

			socket.on("order-update", (data: OrderData) => {
				setOrderData(data);
				setLocations(data.trackingHistory.map((h) => h.location));
				setCurrentLocation(data.location);
			});

			socket.on("location-update", (data: { location: OrderLocation }) => {
				setCurrentLocation(data.location);
				setLocations((prev) => [...prev, data.location]);
			});
		}

		return () => {
			socket.disconnect();
		};
	}, [orderId]);

	const handleTrackOrder = async () => {
		setLoading(true);
		setError("");

		try {
			const response = await fetch(`/api/v1/tracking/${orderId}`);
			const data = await response.json();

			if (!data.ok) {
				throw new Error(data.message);
			}

			setOrderData(data.data);
			if (data.data.trackingHistory) {
				setLocations(data.data.trackingHistory.map((h) => h.location));
			}
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "Failed to fetch order",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 max-w-7xl mx-auto">
			<h1 className="text-2xl font-bold mb-6 text-gray-700">
				Track Your Order
			</h1>

			<div className="mb-6 bg-white p-4 rounded-lg shadow">
				<div className="flex gap-4">
					<input
						type="text"
						value={orderId}
						onChange={(e) => setOrderId(e.target.value)}
						placeholder="Enter Order ID"
						className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 text-gray-400"
						disabled={loading}
					/>
					<button
						onClick={handleTrackOrder}
						disabled={loading}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                     disabled:bg-blue-300 transition-colors"
					>
						{loading ? "Loading..." : "Track Order"}
					</button>
				</div>
				{error && <p className="mt-2 text-red-500">{error}</p>}
			</div>

			{orderData && (
				<div className="grid md:grid-cols-2 gap-6">
					<div className="bg-white p-4 rounded-lg shadow">
						<div className="mb-4">
							<p className="text-gray-600">
								Status:{" "}
								<span className="font-semibold">{orderData.status}</span>
							</p>
						</div>
						<div className="h-[400px] relative">
							<MapContainer
								center={
									currentLocation
										? [currentLocation.lat, currentLocation.lng]
										: [51.505, -0.09]
								}
								zoom={13}
								className="h-full w-full rounded"
							>
								<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
								{currentLocation && <LiveMarker location={currentLocation} />}
								{locations.map((loc, index) => (
									<Marker
										key={index}
										position={[loc.lat, loc.lng]}
										opacity={0.6}
									>
										<Popup>
											Historical Location
											<br />
											{new Date(loc.timestamp).toLocaleString()}
										</Popup>
									</Marker>
								))}
							</MapContainer>
						</div>
					</div>

					<div className="bg-white p-4 rounded-lg shadow">
						<h2 className="text-xl font-bold mb-4 text-gray-700">
							Delivery Timeline
						</h2>
						<Line
							data={{
								labels: locations.map((loc) =>
									new Date(loc.timestamp).toLocaleTimeString(),
								),
								datasets: [
									{
										label: "Delivery Progress",
										data: locations.map((_, index) => index * 10),
										borderColor: "rgb(59, 130, 246)",
										backgroundColor: "rgba(59, 130, 246, 0.1)",
										tension: 0.1,
									},
								],
							}}
							options={{
								responsive: true,
								scales: {
									y: {
										beginAtZero: true,
										grid: {
											color: "rgba(0, 0, 0, 0.1)",
										},
									},
								},
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default TrackingPage;
