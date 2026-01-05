"use client";

import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    } finally {
      router.push("/login");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm text-zinc-600 hover:text-zinc-900"
    >
      Logout
    </button>
  );
}
