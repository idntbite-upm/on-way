"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import ProductCard from "@/components/shop/ShopProduct";
import { Category } from "@/types/category";
import { Product } from "@/types/shop";

type CategoryParams = {
  categoryId: string;
};

export default function CategoryDetailPage() {
  const { categoryId } = useParams<CategoryParams>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!categoryId) return;

      try {
        // Fetch categories to match slug with actual category
        const categoriesResponse = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`,
        );
        const categoryData = categoriesResponse.data.data.find(
          (cat: Category) => cat.slug === categoryId,
        );

        if (!categoryData?._id) {
          throw new Error("Category not found");
        }

        const [categoryResponse, productsResponse] = await Promise.all([
          api.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${categoryData._id}`,
          ),
          api.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/marketproducts/${categoryData._id}`,
          ),
        ]);

        setCategory(categoryResponse.data.data);
        setProducts(productsResponse.data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

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
        {/* Category Header */}
        <div className="relative h-64 rounded-xl shadow-sm overflow-hidden mb-8">
          <img
            src={category?.image}
            alt={category?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-4xl font-bold text-white">{category?.name}</h1>
            <p className="text-white/80 mt-2">{category?.description}</p>
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
