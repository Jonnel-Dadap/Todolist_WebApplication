
"use client";

import Image from "next/image";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TodoNavbar({ logout }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { label: "Today", href: "/todo" },
        { label: "History", href: "/history" },
        { label: "Profile", href: "/profile" },
    ];

    const getNavClass = (href) => {
        const isActive = pathname === href;

        return isActive
            ? "rounded-lg bg-[#A0AC00]/10 px-4 py-2 text-sm font-semibold text-[#8A9500]"
            : "rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900";
    };

    const getMobileNavClass = (href) => {
        const isActive = pathname === href;

        return isActive
            ? "rounded-lg bg-[#A0AC00]/10 px-4 py-3 text-left text-sm font-semibold text-[#8A9500]"
            : "rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900";
    };

    const handleLogout = () => {
        setMenuOpen(false);
        logout();
    };

    return (
        <header className="mb-8 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:px-5">
            <div className="flex items-center justify-between">
                {/* Brand */}
                <Link href="/todo" className="flex items-center gap-3">
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
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={getNavClass(item.href)}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="mx-2 h-6 w-px bg-gray-200" />

                    <button
                        type="button"
                        onClick={handleLogout}
                        aria-label="Logout"
                        title="Logout"
                        className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50/50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 active:scale-95"
                    >
                        <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 md:hidden"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <nav className="mt-3 border-t border-gray-100 pt-3 md:hidden">
                    <div className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={getMobileNavClass(item.href)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="my-1 h-px bg-gray-100" />

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </nav>
            )}
        </header>
    );
}
