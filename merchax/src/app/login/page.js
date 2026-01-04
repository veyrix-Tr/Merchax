"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DUMMY_CREDENTIALS = { email: "admin@example.com", password: "password123" };

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (email === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-zinc-900">Admin Login</h1>
              <p className="mt-1 text-sm text-zinc-500">
                Enter your details to access the dashboard.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {error && (
              <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
                {error}
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-zinc-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-300 focus:outline-none"
              />
            </div>

            <div>
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password123"
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-300 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Login
            </button>
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            Use admin@example.com / password123
          </p>
        </div>
      </div>
    </div>
  );
}
