function Features() {
  return (
    <section
      id="features"
      className="bg-gray-50 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A0AC00]/20 bg-[#A0AC00]/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#A0AC00]" />

            <span className="text-xs font-semibold tracking-wide text-[#8A9500]">
              FEATURES
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to
            <span className="text-[#A0AC00]"> stay organized.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-500 sm:text-lg">
            Simple tools to help you organize your tasks, stay focused,
            and get more done every day.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Create Tasks */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#A0AC00]/30 hover:shadow-lg">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A0AC00]/10 text-lg font-bold text-[#8A9500] transition group-hover:bg-[#A0AC00] group-hover:text-white">
              +
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Create Tasks
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Easily create tasks and keep track of the things you
              need to accomplish.
            </p>

          </div>

          {/* Track Progress */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#A0AC00]/30 hover:shadow-lg">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A0AC00]/10 text-sm font-bold text-[#8A9500] transition group-hover:bg-[#A0AC00] group-hover:text-white">
              ✓
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Track Progress
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Keep track of completed and unfinished tasks so you
              always know what still needs to be done.
            </p>

          </div>

          {/* Stay Organized */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#A0AC00]/30 hover:shadow-lg">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A0AC00]/10 text-sm font-bold text-[#8A9500] transition group-hover:bg-[#A0AC00] group-hover:text-white">
              ≡
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Stay Organized
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Manage your daily activities in one simple workspace
              and keep everything organized.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Features;