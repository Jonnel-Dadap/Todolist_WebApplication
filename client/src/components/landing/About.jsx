"use client";

import Image from "next/image";

function About() {
return ( <section
   id="about"
   className="bg-gray-50 px-6 py-24 lg:px-8"
 > <div className="mx-auto max-w-7xl">

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
          <span className="text-[#A0AC00]">
            {" "}everyday tasks.
          </span>
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

        <div className="mt-7 flex flex-wrap gap-3">
          <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-200">
            Task Management
          </span>

          <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-200">
            Progress Tracking
          </span>

          <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-200">
            Simple & Focused
          </span>
        </div>

      </div>


      {/* Creator Card */}
      <div className="flex justify-center lg:justify-end">

        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center gap-4">

            <Image
              src="/todolist logo.png"
              alt="Todo Post Logo"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-contain"
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8A9500]">
                Created by
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-900">
                Jonnel E. Dadap
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                BSIT Student & Web Developer
              </p>
            </div>

          </div>


          <div className="border-t border-gray-100 pt-5">

            <p className="text-sm leading-6 text-gray-500">
              Todo Post is a personal web development project built
              to explore modern web development, authentication,
              database integration, and task management.
            </p>

          </div>


          {/* Project Highlights */}
          <div className="mt-5 space-y-3">

            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A0AC00]/10 text-sm font-bold text-[#8A9500]">
                +
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  Create tasks
                </p>

                <p className="text-xs text-gray-400">
                  Add and manage your daily tasks
                </p>
              </div>

            </div>


            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A0AC00]/10 text-sm font-bold text-[#8A9500]">
                ✓
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  Track progress
                </p>

                <p className="text-xs text-gray-400">
                  Monitor completed and remaining tasks
                </p>
              </div>

            </div>


            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">

             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A0AC00]/10 text-[#8A9500]">
  <span className="text-sm font-bold">&lt;/&gt;</span>
</div>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  Built for learning
                </p>

                <p className="text-xs text-gray-400">
                  A project for practicing full-stack development
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
