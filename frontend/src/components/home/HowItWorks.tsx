const STEPS = [
    {
        id: 1,
        title: "Choose Your Shop",
        icon: "🏪",
        description: "Browse from our wide selection of shops",
    },
    {
        id: 2,
        title: "Place Your Order",
        icon: "📝",
        description: "Select items and add them to your cart",
    },
    {
        id: 3,
        title: "Track Delivery",
        icon: "🚚",
        description: "Real-time updates on your delivery",
    },
    {
        id: 4,
        title: "Enjoy!",
        icon: "✨",
        description: "Receive your items at your doorstep",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    How OnWay Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STEPS.map((step) => (
                        <div key={step.id} className="text-center">
                            <div className="w-20 h-20 bg-blue-50 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <span className="text-4xl">{step.icon}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
