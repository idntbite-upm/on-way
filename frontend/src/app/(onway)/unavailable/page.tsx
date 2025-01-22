'use client'

import { useRouter } from 'next/navigation'
import { BsTools } from 'react-icons/bs'

export default function UnavailablePage() {
	const router = useRouter()

	return (
		<div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center px-4">
			<div className="relative z-10 text-center">
				<div className="bg-white/10 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-2xl">
					<BsTools className="text-white text-6xl mx-auto mb-6" />
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						Under Development
					</h1>
					<p className="text-xl text-white/90 mb-8">
						We're working hard to bring you something amazing. Please check back soon!
					</p>
					<button
						onClick={() => router.push('/')}
						className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold 
                     hover:bg-opacity-90 transition-all"
					>
						Return Home
					</button>
				</div>
			</div>
		</div>
	)
}
