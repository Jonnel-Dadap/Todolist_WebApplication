function About() {
  return (
    <section
      id="about"
      className="bg-gray-50 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* About Content */}
          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A0AC00]/20 bg-[#A0AC00]/5 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#A0AC00]" />

              <span className="text-xs font-semibold tracking-wide text-[#8A9500]">
                ABOUT TODO POST
              </span>
            </div>

            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple tools for
              <span className="text-[#A0AC00]"> everyday tasks.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
              Todo Post is a simple task management application designed
              to help users organize their tasks and manage their daily
              activities in one place.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-500">
              Create tasks, keep track of your progress, and complete your
              daily goals without unnecessary complexity.
            </p>

          </div>

          {/* About Highlight */}
          <div className="flex justify-center lg:justify-end">

            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A0AC00]/10 text-lg font-bold text-[#8A9500]">
                  T
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Todo Post
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Your simple task workspace
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-3">

                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A0AC00]/10 text-sm font-semibold text-[#8A9500]">
                    +
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Create tasks
                    </p>

                    <p className="text-xs text-gray-400">
                      Add what needs to be done
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A0AC00]/10 text-sm font-semibold text-[#8A9500]">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Track progress
                    </p>

                    <p className="text-xs text-gray-400">
                      See what you've completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A0AC00]/10 text-sm font-semibold text-[#8A9500]">
                    ≡
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Stay organized
                    </p>

                    <p className="text-xs text-gray-400">
                      Keep everything in one place
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;