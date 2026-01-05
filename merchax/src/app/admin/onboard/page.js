"use client";

import { useState } from "react";

export default function AdminOnboardPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreate = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || "Request failed");
        return;
      }

      setSuccess("Admin created");
      setEmail("");
      setPassword("");
    } catch {
      setError("Request failed");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Admin Onboarding</h1>
        <p className="mt-1 text-sm text-zinc-500">Create an admin account.</p>
      </div>

      <div className="max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {error && (
            <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              {success}
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
              className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-300 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Create Admin
          </button>
        </div>
      </div>
    </div>
  );
}
