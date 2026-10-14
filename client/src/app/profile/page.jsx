
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    UserRound,
    Mail,
    CalendarDays,
    CheckCircle2,
    Activity,
    LoaderCircle,
} from "lucide-react";
import TodoNavbar from "@/components/todo/TodoNavbar";

const PROFILE_URL = "http://localhost:5000/api/auth/profile";
const HISTORY_URL = "http://localhost:5000/api/todos/history";

const getCircleColor = (count) => {
    if (count === 0) return "#E8EAE0";
    if (count === 1) return "#DDE3A3";
    if (count <= 3) return "#BFC96A";
    if (count <= 5) return "#8F9C16";
    return "#687300";
};


const getManilaDateKey = (date = new Date()) => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date);

    const values = Object.fromEntries(
        parts.map((part) => [part.type, part.value])
    );

    return `${values.year}-${values.month}-${values.day}`;
};

const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-PH", {
        timeZone: "Asia/Manila",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

const formatDay = (dateKey) => {
    return new Date(`${dateKey}T12:00:00Z`).toLocaleDateString(
        "en-US",
        {
            timeZone: "UTC",
            month: "long",
            day: "numeric",
            year: "numeric",
        }
    );
};

export default function ProfilePage() {
    const router = useRouter();

    const [profile, setProfile] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const [profileResponse, historyResponse] = await Promise.all([
                    fetch(PROFILE_URL, { headers }),
                    fetch(HISTORY_URL, { headers }),
                ]);

                if (
                    profileResponse.status === 401 ||
                    historyResponse.status === 401
                ) {
                    localStorage.removeItem("token");
                    router.push("/login");
                    return;
                }

                const profileData = await profileResponse.json();
                const historyData = await historyResponse.json();

                if (!profileResponse.ok) {
                    throw new Error(
                        profileData.message || "Failed to load profile"
                    );
                }

                if (!historyResponse.ok) {
                    throw new Error(
                        historyData.message || "Failed to load activity"
                    );
                }

                setProfile(profileData);
                setHistory(Array.isArray(historyData) ? historyData : []);
            } catch (err) {
                console.error("Profile loading error:", err);
                setError(err.message || "Unable to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [router]);

    const dailyCounts = useMemo(() => {
        return Object.fromEntries(
            history.map((day) => [day._id, day.completedCount])
        );
    }, [history]);

    const calendar = useMemo(() => {
        const todayKey = getManilaDateKey();
        const end = new Date(`${todayKey}T00:00:00Z`);
        const start = new Date(end);

        start.setUTCDate(start.getUTCDate() - 364);

        // Align the first column with Sunday.
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
                month: date.toLocaleDateString("en-US", {
                    month: "short",
                    timeZone: "UTC",
                }),
                dayOfMonth: date.getUTCDate(),
            });
        }

        return days;
    }, [dailyCounts]);

    const weeks = useMemo(() => {
        const result = [];

        for (let i = 0; i < calendar.length; i += 7) {
            result.push(calendar.slice(i, i + 7));
        }

        return result;
    }, [calendar]);


    const monthlyActivity = useMemo(() => {
        const months = {};

        calendar.forEach((day) => {
            const monthKey = day.date.slice(0, 7);

            if (!months[monthKey]) {
                months[monthKey] = {
                    key: monthKey,
                    label: new Date(`${monthKey}-01T12:00:00Z`).toLocaleDateString(
                        "en-US",
                        {
                            month: "long",
                            year: "numeric",
                            timeZone: "UTC",
                        }
                    ),
                    days: [],
                };
            }

            months[monthKey].days.push(day);
        });

        return Object.values(months).reverse();
    }, [calendar]);


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

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <main className="min-h-screen bg-[#F5F6EE] px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-6xl">
                <TodoNavbar logout={logout} />

                <div className="mb-8 mt-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A9500]">
                        Your Account
                    </p>

                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Your account details and daily progress in one place.
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white p-12 text-sm text-gray-500">
                        <LoaderCircle size={18} className="animate-spin" />
                        Loading your profile...
                    </div>
                ) : error ? (
                    <div className="rounded-xl border border-red-200 bg-white p-6">
                        <p className="font-semibold text-red-600">
                            Unable to load profile
                        </p>
                        <p className="mt-2 text-sm text-gray-500">{error}</p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-lg bg-[#A0AC00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8A9500]"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Account Details */}
                        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F0F2D8] text-[#687300]">
                                    <UserRound size={36} strokeWidth={1.6} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h2 className="break-words text-xl font-bold text-gray-900">
                                        {profile.username}
                                    </h2>

                                    <p className="mt-1 break-all text-sm text-gray-500">
                                        {profile.email}
                                    </p>

                                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                                        <CalendarDays size={14} />
                                        <span>
                                            Joined {formatDate(profile.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                <span className="w-fit rounded-full bg-[#F0F2D8] px-3 py-1.5 text-xs font-semibold text-[#687300]">
                                    Todo Post Member
                                </span>
                            </div>
                        </section>

                        {/* Productivity Overview */}
                        <section className="mt-6">
                            <h2 className="mb-4 text-base font-semibold text-gray-900">
                                Productivity Overview
                            </h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500">
                                            Tasks completed
                                        </p>
                                        <CheckCircle2
                                            size={20}
                                            className="text-[#8A9500]"
                                        />
                                    </div>

                                    <p className="mt-3 text-3xl font-bold text-gray-900">
                                        {totalCompleted}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Total recorded completions
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500">
                                            Active days
                                        </p>
                                        <Activity
                                            size={20}
                                            className="text-[#8A9500]"
                                        />
                                    </div>

                                    <p className="mt-3 text-3xl font-bold text-gray-900">
                                        {activeDays}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Days with completed tasks
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Activity Graph */}


                        {/* Daily Momentum */}
                        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A9500]">
                                        Your consistency
                                    </p>
                                    <h2 className="mt-2 text-lg font-bold text-gray-900">
                                        Daily Momentum
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Every small step adds up.
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl bg-[#F5F6EE] px-4 py-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#A0AC00] text-xs font-bold text-[#687300]">
                                        {activeDays}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            Active days
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            In recorded history
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Graph */}
                            <div className="mt-7 overflow-x-auto pb-3">
                                <div className="min-w-[760px]">
                                    {/* Month labels */}
                                    <div className="mb-3 grid grid-cols-[38px_1fr] gap-2">
                                        <div />

                                        <div className="flex gap-1">
                                            {weeks.map((week, index) => {
                                                const firstOfMonth = week.find(
                                                    (day) => day.dayOfMonth === 1
                                                );

                                                return (
                                                    <div
                                                        key={index}
                                                        className="w-3 shrink-0 text-[10px] font-medium text-gray-400"
                                                    >
                                                        {firstOfMonth ? firstOfMonth.month : ""}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Weekday labels + circular activity graph */}
                                    <div className="grid grid-cols-[38px_1fr] gap-2">
                                        <div className="grid grid-rows-7 gap-y-[7px] text-[10px] text-gray-400">
                                            <span>Sun</span>
                                            <span>Mon</span>
                                            <span>Tue</span>
                                            <span>Wed</span>
                                            <span>Thu</span>
                                            <span>Fri</span>
                                            <span>Sat</span>
                                        </div>

                                        <div className="flex gap-1">
                                            {weeks.map((week, weekIndex) => (
                                                <div key={weekIndex} className="flex flex-col gap-y-[7px]">
                                                    {week.map((day, dayIndex) => (
                                                        <div
                                                            key={day.date}
                                                            className="relative flex h-3 w-3 items-center justify-center"
                                                        >
                                                            {/* Connecting line to the next day in this week */}
                                                            {dayIndex < week.length - 1 && (
                                                                <span
                                                                    className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[7px] w-px -translate-x-1/2"
                                                                    style={{ backgroundColor: "#E5E7D9" }}
                                                                />
                                                            )}

                                                            {/* Daily activity circle */}
                                                            <button
                                                                type="button"
                                                                title={`${day.date}: ${day.count} tasks completed`}
                                                                aria-label={`${formatDay(day.date)}: ${day.count} tasks completed`}
                                                                onClick={() => setSelectedDate(day.date)}
                                                                className={`relative z-10 h-[10px] w-[10px] rounded-full transition-all duration-150 hover:scale-150 focus:outline-none focus:ring-2 focus:ring-[#8A9500] focus:ring-offset-2 ${selectedDate === day.date
                                                                        ? "scale-125 ring-2 ring-gray-900 ring-offset-2"
                                                                        : ""
                                                                    }`}
                                                                style={{
                                                                    backgroundColor: getCircleColor(day.count),
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                                <p className="text-xs text-gray-400">
                                    Select a circle to explore your daily progress.
                                </p>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Rest</span>
                                    {[0, 1, 2, 4, 6].map((count) => (
                                        <span
                                            key={count}
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: getCircleColor(count) }}
                                        />
                                    ))}
                                    <span className="text-xs text-gray-500">In motion</span>
                                </div>
                            </div>
                        </section>

                        {/* Selected Day Details */}
                        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8A9500]">
                                        Daily record
                                    </p>

                                    <h2 className="mt-2 text-base font-semibold text-gray-900">
                                        {selectedDay ? formatDay(selectedDay.date) : "Explore your progress"}
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500">
                                        {selectedDay
                                            ? selectedDay.count === 0
                                                ? "A fresh opportunity to make progress."
                                                : `${selectedDay.count} ${selectedDay.count === 1 ? "task" : "tasks"
                                                } completed on this day.`
                                            : "Select a circle above to see your activity."}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0F2D8] text-[#687300]">
                                    <CheckCircle2 size={21} />
                                </div>
                            </div>
                        </section>


                    </>
                )}
            </div>
        </main>
    );
}
