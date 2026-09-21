import Link from "next/link";
import Image from "next/image";
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <Image
            src="/todolist logo.png"
            alt="Todo Post Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain rounded-lg"
          />

          <span className="text-lg font-semibold tracking-tight text-white">
            Todo Post
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#home"
            className="text-sm font-medium text-gray-400 transition hover:text-white"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-sm font-medium text-gray-400 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-gray-400 transition hover:text-white"
          >
            About
          </a>

        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">

          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-[#A0AC00] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B0BF1A] hover:shadow-md active:scale-95"
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;