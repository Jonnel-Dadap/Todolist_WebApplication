
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TodoNavbar from "@/components/todo/TodoNavbar";

const API_URL = "http://localhost:5000/api/todos/history";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
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
          throw new Error(data.message || "Failed to load history");
        }

        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  const dailyCounts = useMemo(() => {
    return Object.fromEntries(
      history.map((day) => [day._id, day.completedCount])
    );
  }, [history]);

  const calendar = useMemo(() => {
    const today = new Date();
    const end = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    );
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - 363);

    // Start on Sunday so the grid aligns by weekday.
    start.setUTCDate(start.getUTCDate() - start.getUTCDay());

    const days = [];

    for (
      const date = new Date(start);
      date <= end;
      date.setUTCDate(date.getUTCDate() + 1)
    ) {
      const key = [
        date.getUTCFullYear(),
        String(date.getUTCMonth() + 1).padStart(2, "0"),
        String(date.getUTCDate()).padStart(2, "0"),
      ].join("-");

      days.push({
        date: key,
        count: dailyCounts[key] || 0,
      });
    }

    return days;
  }, [dailyCounts]);

  const totalCompleted = history.reduce(
    (total, day) => total + day.completedCount,
    0
  );

  const activeDays = history.filter(
    (day) => day.completedCount > 0
  ).length;

  const selectedDay = calendar.find(
    (day) => day.date === selectedDate
  );

  const getIntensity = (count) => {
    if (count === 0) return "bg-gray-100";
    if (count === 1) return "bg-[#DDE3A3]";
    if (count <= 3) return "bg-[#BFC96A]";
    if (count <= 5) return "bg-[#A0AC00]";
    return "bg-[#687300]";
  };

  const formatDate = (dateString) => {
    return new Date(`${dateString}T12:00:00`).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <main className="min-h-screen bg-[#F5F6EE] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <TodoNavbar logout={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }} />

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A9500]">
            Your Progress
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Activity History
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Every completed task is a step forward. Keep showing up.
          </p>
        </div>

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-sm text-gray-400">
            Loading your activity...
          </div>
        ) : (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-sm text-gray-500">Tasks completed</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {totalCompleted}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-sm text-gray-500">Active days</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {activeDays}
                </p>
              </div>

              <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-5 sm:col-span-1">
                <p className="text-sm text-gray-500">Tracking period</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  1 year
                </p>
              </div>
            </div>

            <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-gray-900">
                  Daily contributions
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Select a square to see your activity for that day.
                </p>
              </div>

              <div className="overflow-x-auto pb-3">
                <div className="min-w-[720px]">
                  <div className="mb-2 grid grid-cols-[32px_1fr] gap-2">
                    <div />
                    <div className="grid grid-cols-12 text-xs text-gray-400">
                      {Array.from({ length: 12 }, (_, index) => (
                        <span key={index}>
                          {new Date(
                            Date.UTC(2026, index, 1)
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            timeZone: "UTC",
                          })}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-[32px_1fr] gap-2">
                    <div className="grid grid-rows-7 gap-1 text-[10px] text-gray-400">
                      <span>Sun</span>
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                    </div>

                    <div className="grid grid-flow-col grid-rows-7 gap-1">
                      {calendar.map((day) => (
                        <button
                          key={day.date}
                          type="button"
                          title={`${day.date}: ${day.count} completed`}
                          aria-label={`${formatDate(day.date)}: ${day.count} tasks completed`}
                          onClick={() => setSelectedDate(day.date)}
                          className={`h-3 w-3 rounded-[3px] transition hover:ring-2 hover:ring-[#8A9500] focus:outline-none focus:ring-2 focus:ring-[#8A9500] ${getIntensity(
                            day.count
                          )} ${
                            selectedDate === day.date
                              ? "ring-2 ring-gray-900"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-gray-400">
                  {activeDays} days with completed tasks
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Less</span>
                  {[0, 1, 2, 4, 6].map((count) => (
                    <span
                      key={count}
                      className={`h-3 w-3 rounded-[3px] ${getIntensity(count)}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500">More</span>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-base font-semibold text-gray-900">
                {selectedDay
                  ? formatDate(selectedDay.date)
                  : "Daily details"}
              </h2>

              {selectedDay ? (
                <p className="mt-2 text-sm text-gray-600">
                  {selectedDay.count === 0
                    ? "No tasks completed on this day."
                    : `${selectedDay.count} ${
                        selectedDay.count === 1 ? "task" : "tasks"
                      } completed.`}
                </p>
              ) : (
                <p className="mt-2 text-sm text-gray-500">
                  Select any square in the graph to view that day's completed task count.
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
