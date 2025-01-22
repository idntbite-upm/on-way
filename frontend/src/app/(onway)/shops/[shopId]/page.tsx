"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import ProductCard from "@/components/shop/ShopProduct";
import { Shop, Product } from "@/types/shop";

type ShopParams = {
  shopId: string;
};

export default function ShopDetailPage() {
  const { shopId } = useParams<ShopParams>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      if (!shopId) return;

      try {
        // Fetch shops to match URL-friendly name with actual shop
        const shopsResponse = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shops`,
        );
        const shopData = shopsResponse.data.data.find(
          (shop: Shop) =>
            shop.name.toLowerCase().replace(/\s+/g, "") === shopId,
        );

        if (!shopData?._id) {
          throw new Error("Shop not found");
        }

        const [shopResponse, productsResponse] = await Promise.all([
          api.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shops/${shopData._id}`,
          ),
          api.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shops/${shopData._id}/products`,
          ),
        ]);

        setShop(shopResponse.data.data);
        setProducts(productsResponse.data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [shopId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Shop Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{shop?.name}</h1>
          <p className="text-gray-600 mt-2">{shop?.location}</p>
          <div className="flex items-center mt-4">
            <span className="text-blue-600 font-medium">
              Rating: {shop?.rating?.toFixed(1)}
            </span>
            <span className="mx-4">•</span>
            <span className="text-gray-600">{shop?.orderCount} Orders</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
