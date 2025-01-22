"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SITEMAP = {
	Main: [
		{ name: "Home", href: "/" },
		{ name: "Shops", href: "/shops" },
		{ name: "OnWay Marketplace", href: "/marketplace" },
		{ name: "About", href: "/about" },
	],
	Support: [
		{ name: "Help Center", href: "/unavailable" },
		{ name: "Track Order", href: "/track" },
		{ name: "Shipping Info", href: "/unavailable" },
		{ name: "FAQs", href: "/unavailable" },
	],
	Legal: [
		{ name: "Terms of Service", href: "/unavailable" },
		{ name: "Privacy Policy", href: "/unavailable" },
		{ name: "Cookie Policy", href: "/unavailable" },
		{ name: "Accessibility", href: "/unavailable" },
	],
	Company: [
		{ name: "About Us", href: "/about" },
		{ name: "Careers", href: "/about" },
		{ name: "Partner with Us", href: "/about" },
		{ name: "Blog", href: "/about" },
	],
};

const SOCIAL_LINKS = [
	{ name: "Twitter", href: "https://twitter.com", icon: "𝕏" },
	{ name: "Facebook", href: "https://facebook.com", icon: "f" },
	{ name: "Instagram", href: "https://instagram.com", icon: "📸" },
	{ name: "LinkedIn", href: "https://linkedin.com", icon: "in" },
];

export default function Footer() {
	const pathname = usePathname();
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-50 border-t border-gray-200">
			{/* Main Footer Content */}
			<div className="container mx-auto px-4 py-12">
				{/* Brand and Description */}
				<div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
					<div className="lg:col-span-2">
						<Link href="/" className="inline-block">
							<h2 className="text-2xl font-bold text-blue-600">OnWay</h2>
						</Link>
						<p className="mt-4 text-gray-600 max-w-sm">
							Your trusted delivery service for goods and more. Making local
							delivery simple, fast, and reliable.
						</p>

						{/* Social Links */}
						<div className="mt-6 flex space-x-4">
							{SOCIAL_LINKS.map((social) => (
								<a
									key={social.name}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 
                    hover:bg-blue-600 hover:text-white transition-colors duration-200"
									aria-label={social.name}
								>
									{social.icon}
								</a>
							))}
						</div>
					</div>

					{/* Sitemap */}
					<div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
						{Object.entries(SITEMAP).map(([category, links]) => (
							<div key={category}>
								<h3 className="text-gray-900 font-semibold mb-4">{category}</h3>
								<ul className="space-y-3">
									{links.map((link) => (
										<li key={link.name}>
											<Link
												href={link.href}
												className={`text-sm hover:text-blue-600 transition-colors duration-200 ${
													pathname === link.href
														? "text-blue-600"
														: "text-gray-600"
												}`}
											>
												{link.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* Newsletter Subscription */}
				<div className="border-t border-gray-200 pt-8 pb-12">
					<div className="max-w-md mx-auto text-center">
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							Subscribe to Our Newsletter
						</h3>
						<p className="text-gray-600 mb-4">
							Stay updated with the latest deals and features
						</p>
						<form className="flex gap-2">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none 
                  focus:ring-2 focus:ring-blue-600 focus:border-transparent"
							/>
							<button
								type="submit"
								className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                  transition-colors duration-200"
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-200 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-600 text-sm mb-4 md:mb-0">
							© {currentYear} OnWay Delivery. All rights reserved.
						</p>
						<div className="flex items-center space-x-4">
							<button className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
								Change Region
							</button>
							<div className="h-4 w-px bg-gray-300" />
							<button className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
								English
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* App Download Banner */}
			<div className="bg-blue-600 text-white py-4">
				<div className="container mx-auto px-4">
					<div className="flex flex-col sm:flex-row items-center justify-between">
						<p className="text-sm mb-4 sm:mb-0">
							Get the OnWay mobile app for faster delivery
						</p>
						<div className="flex space-x-4">
							<button
								className="px-4 py-1.5 bg-white text-blue-600 rounded-lg text-sm font-medium 
                hover:bg-opacity-90 transition-colors duration-200"
							>
								App Store
							</button>
							<button
								className="px-4 py-1.5 bg-white text-blue-600 rounded-lg text-sm font-medium 
                hover:bg-opacity-90 transition-colors duration-200"
							>
								Play Store
							</button>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
