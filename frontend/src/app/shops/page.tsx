"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Shop } from "@/types/shop";

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "orders">("rating");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shops`,
        );
        setShops(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shops:", error);
        setError("Failed to load shops");
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  const sortedShops = [...shops].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return b.orderCount - a.orderCount;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div className="space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Available Shops</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setSortBy("rating")}
            className={`px-4 py-2 rounded-lg transition-colors ${sortBy === "rating"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            Sort by Rating
          </button>
          <button
            onClick={() => setSortBy("orders")}
            className={`px-4 py-2 rounded-lg transition-colors ${sortBy === "orders"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            Sort by Orders
          </button>
        </div>
      </div>

      {shops.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No shops found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedShops.map((shop) => (
            <div
              key={shop._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{shop.name}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${shop.isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {shop.isOpen ? "Open" : "Closed"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      strokeCurrentColor
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      {shop.openingTime} - {shop.closingTime}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 font-semibold">
                        {shop?.rating?.toFixed(1) || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-500 mr-1"
                        fill="none"
                        strokeCurrentColor
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      <span className="font-semibold">
                        {shop.orderCount} orders
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
