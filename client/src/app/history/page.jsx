"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/todos/history", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setHistory(data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#F5F6EE] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Your History
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Track your completed tasks over time.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">
            Loading history...
          </p>
        ) : history.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-sm font-medium text-gray-700">
              No activity yet
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Complete some tasks to start building your history.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="space-y-3">
              {history.map((day) => (
                <div
                  key={day._id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-gray-600">
                    {day._id}
                  </span>

                  <span className="text-sm font-semibold text-[#8A9500]">
                    {day.completedCount} completed
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}