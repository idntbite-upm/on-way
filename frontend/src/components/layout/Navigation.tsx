"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Shops", href: "/shops" },
    { name: "OnWay Marketplace", href: "/marketplace" },
    { name: "Contact", href: "/contact" },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors hover:text-gray-900 ${pathname === item.href ? "text-gray-900" : "text-white"
                        }`}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
}
