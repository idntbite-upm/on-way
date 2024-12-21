const MOCK_SHOPS = [
    { id: 1, name: "Fresh Mart", category: "Grocery", rating: 4.8 },
    { id: 2, name: "Quick Bites", category: "Fast Food", rating: 4.5 },
    { id: 3, name: "Green Garden", category: "Vegetarian", rating: 4.7 },
    { id: 4, name: "Sweet Tooth", category: "Desserts", rating: 4.9 },
];

export default function FeaturedShops() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Popular Shops</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {MOCK_SHOPS.map((shop) => (
                        <div
                            key={shop.id}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto flex items-center justify-center">
                                <span className="text-blue-600 text-2xl">🏪</span>
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-2">
                                {shop.name}
                            </h3>
                            <p className="text-gray-600 text-center mb-2">{shop.category}</p>
                            <div className="flex items-center justify-center">
                                <span className="text-yellow-400">⭐</span>
                                <span className="ml-1 font-medium">{shop.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
