"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    setCurrentDate(formattedDate);
  }, []);

  return (
    <section
      id="home"
      className="min-h-[85vh] bg-white px-6 py-20 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">

        {/* Hero Content */}
        <div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A0AC00]/20 bg-[#A0AC00]/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#A0AC00]" />

            <span className="text-xs font-semibold tracking-wide text-[#8A9500]">
              SIMPLE TASK MANAGEMENT
            </span>
          </div>

          <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Get Things
            <span className="block text-[#A0AC00]">
              Done.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
            Organize your tasks, stay focused, and keep track of
            what matters most — all in one simple workspace.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <a
              href="/register"
              className="rounded-lg bg-[#A0AC00] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#B0BF1A] hover:shadow-md active:scale-95"
            >
              Get Started
            </a>

            <a
              href="#features"
              className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 active:scale-95"
            >
              Learn More
            </a>

          </div>

          {/* Small Trust Text */}
          <p className="mt-5 text-xs text-gray-400">
            Simple. Focused. Built for getting things done.
          </p>

        </div>

        {/* App Preview */}
        <div className="flex justify-center lg:justify-end">

          <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

            {/* Preview Header */}
            <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4">

              <div>
                <p className="text-xs font-medium text-gray-400">
                  WORKSPACE
                </p>

                <h2 className="mt-1 text-lg font-semibold text-gray-900">
                  My Tasks
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {currentDate}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#A0AC00] text-sm font-bold text-white">
                +
              </div>

            </div>

            {/* Todo Items */}
            <div className="space-y-3">

              {/* Task 1 */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">

                <div className="h-4 w-4 rounded border-2 border-[#A0AC00]" />

                <span className="text-sm text-gray-700">
                  Finish project documentation
                </span>

              </div>

              {/* Task 2 */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">

                <div className="h-4 w-4 rounded border-2 border-[#A0AC00]" />

                <span className="text-sm text-gray-700">
                  Review today's tasks
                </span>

              </div>

              {/* Completed Task */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">

                <div className="flex h-4 w-4 items-center justify-center rounded bg-[#A0AC00] text-[10px] text-white">
                  ✓
                </div>

                <span className="text-sm text-gray-400 line-through">
                  Plan the week
                </span>

              </div>

            </div>

            {/* Preview Footer */}
            <div className="mt-4 flex items-center justify-between px-2">

              <span className="text-xs text-gray-400">
                2 tasks remaining
              </span>

              <span className="text-xs font-medium text-[#8A9500]">
                Stay focused
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}