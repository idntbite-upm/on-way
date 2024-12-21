"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Navigation from "./Navigation";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isSignedIn } = useUser();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600"> ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl">
                    OnWay
                </Link>
                <Navigation />
                <div className="flex items-center gap-4">
                    {!isSignedIn ? (
                        <>
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium hover:text-blue-600 transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium 
                  hover:bg-blue-700 transition-colors"
                                >
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </>
                    ) : (
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "h-8 w-8",
                                },
                            }}
                        />
                    )}
                </div>
            </div>
        </header>
    );
}
