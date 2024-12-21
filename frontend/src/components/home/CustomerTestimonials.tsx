const TESTIMONIALS = [
    {
        id: 1,
        name: "John D.",
        text: "Fast delivery and great service!",
        rating: 5,
    },
    {
        id: 2,
        name: "Sarah M.",
        text: "Love the variety of shops available!",
        rating: 5,
    },
    {
        id: 3,
        name: "Mike R.",
        text: "OnWay makes ordering so convenient!",
        rating: 4,
    },
];

export default function CustomerTestimonials() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    What Our Customers Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white p-6 rounded-xl shadow-lg"
                        >
                            <div className="flex justify-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-400">
                                        ⭐
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-4 text-center italic">
                                "{testimonial.text}"
                            </p>
                            <p className="text-center font-semibold">{testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
