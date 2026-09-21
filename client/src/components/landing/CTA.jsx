function CTA() {
  return (
    <section
      id="cta"
      className="px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">

        <div className="relative overflow-hidden rounded-3xl bg-[#A0AC00] px-6 py-16 text-center shadow-[0_20px_60px_rgba(160,172,0,0.20)] sm:px-12">

          {/* Decorative Elements */}
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/10" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-xl font-bold text-white">
              T
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Get Organized?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Start managing your tasks, stay focused, and keep everything
              organized in one simple workspace.
            </p>

            <a
              href="/register"
              className="mt-8 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100 hover:shadow-md active:scale-95"
            >
              Get Started
            </a>

            <p className="mt-4 text-xs text-white/60">
              Simple. Focused. Built for getting things done.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CTA;