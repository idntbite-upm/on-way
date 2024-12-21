export default function PromotionalBanner() {
    return (
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
            <div className="container mx-auto px-4 text-center text-white">
                <h2 className="text-3xl font-bold mb-6">Special Offer!</h2>
                <p className="text-xl mb-8">
                    Free delivery on your first order with code: ONWAYFIRST
                </p>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
                    Claim Offer
                </button>
            </div>
        </section>
    );
}
