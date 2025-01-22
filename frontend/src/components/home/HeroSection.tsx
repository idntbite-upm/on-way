export default function HeroSection() {
	return (
		<section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative z-10 text-center text-white px-4">
				<h1 className="text-5xl md:text-7xl font-bold mb-6">OnWay</h1>
				<p className="text-xl md:text-2xl mb-8">
					Your favorite shops, delivered to your doorstep
				</p>
				<a href="/marketplace">
					<button
						className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold 
          hover:bg-opacity-90 transition-all"
					>
						Order Now
					</button>
				</a>
			</div>
		</section>
	);
}
