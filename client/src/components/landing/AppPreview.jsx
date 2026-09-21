function AppPreview() {
  return (
    <section
      id="app-preview"
      className="bg-white px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A0AC00]/20 bg-[#A0AC00]/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#A0AC00]" />

            <span className="text-xs font-semibold tracking-wide text-[#8A9500]">
              YOUR WORKSPACE
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            See Your Tasks
            <span className="text-[#A0AC00]"> in One Place.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-500 sm:text-lg">
            A simple workspace that keeps your daily tasks organized
            and easy to manage.
          </p>

        </div>

        {/* App Preview */}
        <div className="mx-auto max-w-5xl">

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A0AC00] text-sm font-bold text-white">
                  T
                </div>

                <span className="text-sm font-semibold text-gray-900">
                  Todo Post
                </span>

              </div>

              <div className="h-8 w-8 rounded-full bg-gray-100" />

            </div>

            {/* Dashboard */}
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[220px_1fr]">

              {/* Sidebar */}
              <div className="hidden rounded-xl border border-gray-200 bg-white p-4 lg:block">

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Menu
                </p>

                <div className="mt-4 space-y-2">

                  <div className="rounded-lg bg-[#A0AC00]/10 px-3 py-2 text-sm font-medium text-[#8A9500]">
                    My Tasks
                  </div>

                  <div className="px-3 py-2 text-sm text-gray-500">
                    Completed
                  </div>

                  <div className="px-3 py-2 text-sm text-gray-500">
                    Settings
                  </div>

                </div>

              </div>

              {/* Main Content */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      WEDNESDAY, SEPTEMBER 23, 2026
                    </p>

                    <h3 className="mt-1 text-2xl font-semibold text-gray-900">
                      My Tasks
                    </h3>
                  </div>

                  <button className="rounded-lg bg-[#A0AC00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#B0BF1A]">
                    + Add Task
                  </button>

                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">
                      Total Tasks
                    </p>

                    <p className="mt-1 text-xl font-semibold text-gray-900">
                      5
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">
                      Completed
                    </p>

                    <p className="mt-1 text-xl font-semibold text-[#8A9500]">
                      3
                    </p>
                  </div>

                  <div className="hidden rounded-xl border border-gray-100 bg-gray-50 p-4 sm:block">
                    <p className="text-xs text-gray-400">
                      Remaining
                    </p>

                    <p className="mt-1 text-xl font-semibold text-gray-900">
                      2
                    </p>
                  </div>

                </div>

                {/* Task List */}
                <div className="mt-6">

                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Today's Tasks
                    </h4>

                    <span className="text-xs text-gray-400">
                      2 remaining
                    </span>
                  </div>

                  <div className="space-y-3">

                    {/* Task 1 */}
                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">

                      <div className="h-4 w-4 rounded border-2 border-[#A0AC00]" />

                      <span className="text-sm text-gray-700">
                        Finish school project
                      </span>

                    </div>

                    {/* Task 2 */}
                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">

                      <div className="h-4 w-4 rounded border-2 border-[#A0AC00]" />

                      <span className="text-sm text-gray-700">
                        Review JavaScript
                      </span>

                    </div>

                    {/* Task 3 */}
                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">

                      <div className="flex h-4 w-4 items-center justify-center rounded bg-[#A0AC00] text-[10px] text-white">
                        ✓
                      </div>

                      <span className="text-sm text-gray-400 line-through">
                        Work on Todo App
                      </span>

                    </div>

                  </div>

                </div>

                {/* Progress */}
                <div className="mt-6">

                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Daily Progress
                    </span>

                    <span className="text-xs font-semibold text-[#8A9500]">
                      60%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[60%] rounded-full bg-[#A0AC00]" />
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

export default AppPreview;