"use client";

import Image from "next/image";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export default function TodoNavbar({ logout }) {
    const [menuOpen, setMenuOpen] = useState(false);
  

    return (
        <header className="mb-8 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:px-5">
            <div className="flex items-center justify-between">

                {/* Brand */}
                <div className="flex items-center gap-3">
                    <Image
                        src="/todolist logo.png"
                        alt="Todo Post Logo"
                        width={42}
                        height={42}
                        className="h-10 w-10 rounded-full object-contain"
                    />

                    <div>
                        <h1 className="text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                            Todo Post
                        </h1>

                        <p className="hidden text-xs text-gray-400 sm:block">
                            Your daily task workspace
                        </p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 md:flex">
                    <button
                        className="rounded-lg bg-[#A0AC00]/10 px-4 py-2 text-sm font-medium text-[#8A9500]"
                    >
                        Today
                    </button>

                    <button
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                    >
                        History
                    </button>

                    <button
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                    >
                        Profile
                    </button>

                    <div className="mx-2 h-6 w-px bg-gray-200" />

                    <button
                        onClick={logout}
                        className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50/50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 active:scale-85"
                    >
                        <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                        
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 md:hidden"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <nav className="mt-3 border-t border-gray-100 pt-3 md:hidden">
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="rounded-lg bg-[#A0AC00]/10 px-4 py-3 text-left text-sm font-medium text-[#8A9500]"
                        >
                            Today
                        </button>

                        <button
                            onClick={() => setMenuOpen(false)}
                            className="rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            History
                        </button>

                        <button
                            onClick={() => setMenuOpen(false)}
                            className="rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            Profile
                        </button>

                        <div className="my-1 h-px bg-gray-100" />

                        <button
                            onClick={logout}
                            className="rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            )}
        </header>
    );
}