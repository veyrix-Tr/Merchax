"use client";

import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
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
