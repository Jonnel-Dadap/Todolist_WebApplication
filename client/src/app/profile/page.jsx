
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
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A9500]">
                                        Your consistency
                                    </p>
                                    <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900">
                                        Daily Momentum
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        A year of small steps and completed tasks.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-[#F5F6EE] px-4 py-3">
                                    <p className="text-xs text-gray-500">Days you made progress</p>
                                    <p className="mt-1 text-xl font-bold text-[#687300]">
                                        {activeDays}
                                        <span className="ml-1 text-xs font-medium text-gray-400">
                                            days
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {monthlyActivity.map((month) => {
                                    const firstDay = new Date(
                                        `${month.key}-01T00:00:00Z`
                                    ).getUTCDay();

                                    return (
                                        <div
                                            key={month.key}
                                            className="rounded-xl border border-gray-100 bg-[#FAFAF6] p-4"
                                        >
                                            <div className="mb-4 flex items-center justify-between">
                                                <h3 className="text-sm font-semibold text-gray-800">
                                                    {month.label}
                                                </h3>
                                                <span className="text-xs text-gray-400">
                                                    {month.days.reduce((sum, day) => sum + day.count, 0)} done
                                                </span>
                                            </div>

                                            <div className="mb-2 grid grid-cols-7 gap-y-2 text-center">
                                                {["S", "M", "T", "W", "T", "F", "S"].map(
                                                    (label, index) => (
                                                        <span
                                                            key={`${label}-${index}`}
                                                            className="text-[10px] font-medium text-gray-400"
                                                        >
                                                            {label}
                                                        </span>
                                                    )
                                                )}
                                            </div>

                                            <div className="grid grid-cols-7 justify-items-center gap-y-2">
                                                {Array.from({ length: firstDay }).map((_, index) => (
                                                    <span key={`empty-${index}`} className="h-7 w-7" />
                                                ))}

                                                {month.days.map((day) => (
                                                    <button
                                                        key={day.date}
                                                        type="button"
                                                        title={`${day.date}: ${day.count} tasks completed`}
                                                        aria-label={`${formatDay(day.date)}: ${day.count} tasks completed`}
                                                        onClick={() => setSelectedDate(day.date)}
                                                        className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium transition ${day.count === 0
                                                                ? "bg-gray-100 text-gray-500"
                                                                : day.count === 1
                                                                    ? "bg-[#E6EABF] text-[#687300]"
                                                                    : day.count <= 3
                                                                        ? "bg-[#C8D27A] text-[#465000]"
                                                                        : day.count <= 5
                                                                            ? "bg-[#A0AC00] text-white"
                                                                            : "bg-[#687300] text-white"
                                                            } ${selectedDate === day.date
                                                                ? "ring-2 ring-gray-900 ring-offset-1"
                                                                : "hover:ring-2 hover:ring-[#A0AC00] hover:ring-offset-1"
                                                            }`}
                                                    >
                                                        {day.dayOfMonth}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                                <p className="text-xs text-gray-400">
                                    Select any date to review your progress.
                                </p>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Less</span>
                                    {[0, 1, 2, 4, 6].map((count) => (
                                        <span
                                            key={count}
                                            className={`h-3 w-3 rounded-full ${getIntensity(count)}`}
                                        />
                                    ))}
                                    <span className="text-xs text-gray-500">More</span>
                                </div>
                            </div>
                        </section>

                    </>
                )}
            </div>
        </main>
    );
}
