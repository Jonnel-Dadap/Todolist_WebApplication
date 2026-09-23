"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            localStorage.setItem("token", data.token);

            router.push("/todo");

        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F6EE] px-6 py-12">

            {/* Background Decorations */}
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#A0AC00]/10 blur-3xl" />

            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#A0AC00]/10 blur-3xl" />


            {/* Register Content */}
            <div className="relative z-10 w-full max-w-md">

                {/* Register Card */}
                <div className="login-card rounded-2xl border border-gray-200/80 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-10">

                    {/* Logo */}
                    <div className="mb-7 flex justify-center">

                        <Image
                            src="/todolist logo.png"
                            alt="Todo Post Logo"
                            width={80}
                            height={80}
                            className="login-logo h-20 w-20 rounded-full object-contain"
                        />

                    </div>


                    {/* Header */}
                    <div className="mb-8 text-center">

                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Create Account
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Create your account to get started
                        </p>

                    </div>


                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Username */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Username
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#A0AC00] focus:ring-2 focus:ring-[#A0AC00]/10"
                            />

                        </div>


                        {/* Email */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#A0AC00] focus:ring-2 focus:ring-[#A0AC00]/10"
                            />

                        </div>


                        {/* Password */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#A0AC00] focus:ring-2 focus:ring-[#A0AC00]/10"
                            />

                        </div>


                        {/* Error Message */}
                        {error && (
                            <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3">
                                <p className="text-center text-sm text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}


                        {/* Success Message */}
                        {message && (
                            <div className="rounded-lg border border-green-100 bg-green-50 px-4 py-3">
                                <p className="text-center text-sm text-green-600">
                                    {message}
                                </p>
                            </div>
                        )}


                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#A0AC00] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B0BF1A] hover:shadow-md active:scale-[0.98]"
                        >
                            Create Account
                        </button>

                    </form>


                    {/* Login Link */}
                    <p className="mt-7 text-center text-sm text-gray-500">

                        Already have an account?{" "}

                        <a
                            href="/login"
                            className="font-semibold text-[#8A9500] transition hover:text-[#A0AC00] hover:underline"
                        >
                            Sign in
                        </a>

                    </p>

                </div>


                {/* Back to Home */}
                <div className="mt-6 text-center">

                    <a
                        href="/"
                        className="text-sm text-gray-400 transition hover:text-gray-700"
                    >
                        ← Back to home
                    </a>

                </div>

            </div>

        </main>
    );
}