'use client';
import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { Product } from '@/types/product';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Detailed logging
        console.log('Fetching products from:', api.defaults.baseURL);
        
        const response = await api.get('/products');
        
        // More detailed logging
        console.log('Full API Response:', response);
        console.log('Products:', response.data.data);

        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Detailed Fetch Error:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-2xl">Loading products...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen text-red-500">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Menu</h1>
      
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div 
              key={product._id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <img 
                src={product.photo} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
