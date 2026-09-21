function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Brand */}
        <div className="flex flex-col items-center text-center">

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A0AC00] text-sm font-bold text-white">
              T
            </div>

            <span className="text-sm font-semibold text-white">
              Todo Post
            </span>

          </div>

          <p className="mt-3 text-sm text-gray-500">
            Simple task management for everyday work.
          </p>

        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gray-800" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2026 Todo Post. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;