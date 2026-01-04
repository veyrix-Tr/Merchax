import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import AdminGuard from "@/components/AdminGuard";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/new", label: "Add Product" },
];

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-zinc-50">
        <div className="flex min-h-screen">
          <aside className="hidden w-64 shrink-0 border-r border-zinc-200 bg-white sm:flex sm:flex-col">
            <div className="px-5 py-4 border-b border-zinc-200">
              <div className="text-sm font-semibold tracking-tight text-zinc-900">
                Admin Panel
              </div>
              <div className="mt-1 text-xs text-zinc-500">Merchax</div>
            </div>

          <nav className="flex-1 px-3 py-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="border-t border-zinc-200 px-5 py-4 text-xs text-zinc-500">
              Static UI
            </div>
          </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="sm:hidden">
                  <Link
                    href="/admin/dashboard"
                    className="text-sm font-semibold text-zinc-900"
                  >
                    Admin
                  </Link>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-zinc-900">Admin</div>
                  <div className="text-xs text-zinc-500">Dashboard</div>
                </div>
              </div>

              <div className="text-sm text-zinc-600">Profile: Admin User</div>
              <AdminHeader />
            </div>

            <div className="sm:hidden border-t border-zinc-200">
              <div className="flex gap-2 overflow-x-auto px-4 py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="whitespace-nowrap rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6">{children}</main>
        </div>
      </div>
    </div>
    </AdminGuard>
  );
}
