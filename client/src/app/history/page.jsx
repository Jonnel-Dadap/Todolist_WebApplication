"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, History, Clock3 } from "lucide-react";
import TodoNavbar from "@/components/todo/TodoNavbar";

const API_URL = "http://localhost:5000/api/todos/history/tasks";

export default function HistoryPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryTasks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to load task history");
        }

        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching task history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryTasks();
  }, [router]);

  const groupedTasks = tasks.reduce((groups, task) => {
    if (!groups[task.date]) {
      groups[task.date] = [];
    }

    groups[task.date].push(task);
    return groups;
  }, {});

  const dates = Object.keys(groupedTasks).sort((a, b) =>
    b.localeCompare(a)
  );

  const completedCount = tasks.filter((task) => task.completed).length;
  const unfinishedCount = tasks.length - completedCount;

  const formatDate = (dateString) => {
    return new Date(`${dateString}T12:00:00`).toLocaleDateString(
      "en-PH",
      {
        timeZone: "Asia/Manila",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <main className="min-h-screen bg-[#F5F6EE] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <TodoNavbar
          logout={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        />

        <div className="mb-8 mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A9500]">
            Your Records
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Task History
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review your previous tasks and see what you accomplished each day.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 size={17} className="text-[#8A9500]" />
              Completed
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {completedCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock3 size={17} className="text-gray-400" />
              Unfinished
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {unfinishedCount}
            </p>
          </div>
        </div>

        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0F2D8] text-[#8A9500]">
              <History size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Previous Days
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {tasks.length} {tasks.length === 1 ? "task" : "tasks"} recorded
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-gray-400">
              Loading your task history...
            </div>
          ) : tasks.length === 0 ? (
            <div className="py-12 text-center">
              <History size={32} className="mx-auto text-gray-300" />

              <h3 className="mt-4 font-semibold text-gray-800">
                No previous tasks yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Tasks from previous days will appear here once you start
                building your daily routine.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {dates.map((date) => (
                <div key={date}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {formatDate(date)}
                    </h3>

                    <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                      {groupedTasks[date].length}{" "}
                      {groupedTasks[date].length === 1 ? "task" : "tasks"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {groupedTasks[date].map((task) => (
                      <div
                        key={task._id}
                        className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/70 p-4"
                      >
                        <div className="mt-0.5 shrink-0">
                          {task.completed ? (
                            <CheckCircle2
                              size={19}
                              className="text-[#8A9500]"
                            />
                          ) : (
                            <Circle
                              size={19}
                              className="text-gray-300"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className={`break-words text-sm font-medium ${
                              task.completed
                                ? "text-gray-400 line-through"
                                : "text-gray-800"
                            }`}
                          >
                            {task.title}
                          </p>

                          {task.carriedFrom && (
                            <p className="mt-1 text-xs font-medium text-[#8A9500]">
                              Carried over from a previous day
                            </p>
                          )}
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                            task.completed
                              ? "bg-[#F0F2D8] text-[#687300]"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {task.completed ? "Completed" : "Unfinished"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}