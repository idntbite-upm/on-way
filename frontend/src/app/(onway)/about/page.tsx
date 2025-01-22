"use client";

import Image from "next/image";

export default function AboutPage() {
	const stats = [
		{ number: "50K", label: "Monthly Users", icon: "📱" },
		{ number: "5K", label: "Active Delivery Partners", icon: "🛵" },
		{ number: "10", label: "Moroccan Cities", icon: "🏙" },
		{ number: "2K", label: "Restaurant Partners", icon: "🍽" },
	];

	const impactStats = [
		{ number: "1M+", label: "Deliveries Completed", icon: "📦" },
		{ number: "30min", label: "Average Delivery Time", icon: "⏱" },
		{ number: "15K", label: "Local Jobs Created", icon: "💪" },
		{ number: "500+", label: "Local Businesses Supported", icon: "🏪" },
	];

	const jobs = [
		{
			title: "Delivery Partner",
			location: "Casablanca, Morocco",
			type: "Flexible Hours",
		},
		{
			title: "Operations Manager",
			location: "Rabat, Morocco",
			type: "Full-time",
		},
		{
			title: "Customer Support",
			location: "Marrakech, Morocco",
			type: "Full-time",
		},
	];

	return (
		<div className="w-full">
			{/* Hero Section */}
			<section className="relative h-screen w-full flex items-center justify-center">
				<div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-90">
					{/* Add a Moroccan-themed background image here */}
					<div className="absolute inset-0 bg-black opacity-30" />
				</div>
				<div className="relative z-10 text-center px-4 max-w-4xl">
					<h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
						Delivering Morocco's Favorites
					</h1>
					<p className="text-white text-xl md:text-2xl opacity-90">
						From local delicacies to daily essentials, delivered to your
						doorstep
					</p>
				</div>
			</section>

			{/* About Us Section */}
			<section className="py-24 px-4 bg-white">
				<div className="container mx-auto max-w-7xl">
					<div className="flex flex-col md:flex-row items-center gap-16">
						<div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
							<div className="relative h-[500px] bg-gray-100">
								{/* Add image of Moroccan delivery scene */}
							</div>
						</div>
						<div className="w-full md:w-1/2 space-y-6">
							<h2 className="text-4xl font-bold text-gray-900">We are OnWay</h2>
							<div className="space-y-4">
								<p className="text-gray-700 text-lg leading-relaxed">
									Founded in Morocco, OnWay is revolutionizing the way people
									receive their favorite items. We connect local businesses with
									customers through our network of dedicated delivery partners.
								</p>
								<p className="text-gray-700 text-lg leading-relaxed">
									Our mission is to empower local businesses, create flexible
									earning opportunities, and provide convenient delivery
									services to communities across Morocco.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto max-w-7xl px-4">
					<h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
						What We Deliver
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
							<div className="text-5xl mb-4">🍽</div>
							<h3 className="text-xl font-bold mb-4">Restaurant Delivery</h3>
							<p className="text-gray-600">
								Your favorite local restaurants delivered hot and fresh to your
								door
							</p>
						</div>
						<div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
							<div className="text-5xl mb-4">🛒</div>
							<h3 className="text-xl font-bold mb-4">Grocery Delivery</h3>
							<p className="text-gray-600">
								Daily essentials and groceries delivered within hours
							</p>
						</div>
						<div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
							<div className="text-5xl mb-4">📦</div>
							<h3 className="text-xl font-bold mb-4">Express Delivery</h3>
							<p className="text-gray-600">
								Quick and reliable delivery for urgent packages
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-20 bg-white">
				<div className="container mx-auto max-w-7xl px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
						{stats.map((stat, index) => (
							<div
								key={index}
								className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
							>
								<div className="text-4xl mb-4">{stat.icon}</div>
								<h3 className="text-5xl font-bold text-green-600 mb-2">
									{stat.number}
								</h3>
								<p className="text-gray-600 text-lg">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Impact Section */}
			<section className="py-24 bg-gray-50">
				<div className="container mx-auto max-w-7xl px-4">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-6">
							Our Impact in Morocco
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Supporting local businesses and creating opportunities across the
							kingdom
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
						{impactStats.map((stat, index) => (
							<div
								key={index}
								className="text-center p-8 bg-white rounded-xl hover:bg-gray-50 transition-colors duration-300"
							>
								<div className="text-4xl mb-4">{stat.icon}</div>
								<h3 className="text-4xl font-bold text-green-600 mb-2">
									{stat.number}
								</h3>
								<p className="text-gray-600 text-lg">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Join Us Section */}
			<section className="py-24 bg-white">
				<div className="container mx-auto max-w-7xl px-4">
					<h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
						Join the OnWay Family
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						{jobs.map((job, index) => (
							<div
								key={index}
								className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
							>
								<h3 className="text-xl font-bold text-gray-900 mb-2">
									{job.title}
								</h3>
								<p className="text-gray-600 mb-4">{job.location}</p>
								<span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm">
									{job.type}
								</span>
							</div>
						))}
					</div>
					<div className="text-center">
						<button
							className="inline-block bg-green-600 text-white px-8 py-4 
              rounded-full text-lg font-semibold hover:bg-green-700 
              transition-colors duration-300 transform hover:scale-105"
						>
							Join Our Team
						</button>
					</div>
				</div>
			</section>

			{/* Cities Section */}
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto max-w-7xl px-4">
					<h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
						Available in Major Moroccan Cities
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						{[
							"Casablanca",
							"Rabat",
							"Marrakech",
							"Fes",
							"Tangier",
							"Agadir",
							"Meknes",
							"Oujda",
						].map((city) => (
							<div key={city} className="p-4">
								<p className="text-lg text-gray-700">{city}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
