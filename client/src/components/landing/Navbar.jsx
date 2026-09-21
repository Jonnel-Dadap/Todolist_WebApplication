import Link from "next/link";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A0AC00] text-sm font-bold text-white transition group-hover:bg-[#B0BF1A]">
            T
          </span>

          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Todo Post
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#home"
            className="text-sm font-medium text-gray-600 transition hover:text-[#A0AC00]"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-sm font-medium text-gray-600 transition hover:text-[#A0AC00]"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-gray-600 transition hover:text-[#A0AC00]"
          >
            About
          </a>

        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">

          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-[#A0AC00] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#B0BF1A] hover:shadow-md active:scale-95"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;