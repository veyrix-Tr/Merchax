import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Top Navigation */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-sm font-semibold text-white">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">
                Admin Dashboard
              </p>
              <p className="text-xs text-zinc-500">
                Product Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Operational
            </span>
            <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome */}
        <section className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back, Admin
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Manage your products, inventory, and system performance from a
            centralized administrative dashboard.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Products", value: "128" },
            { label: "Active Products", value: "102" },
            { label: "Out of Stock", value: "9" },
            { label: "Categories", value: "12" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-200 bg-white p-6"
            >
              <p className="text-sm font-medium text-zinc-500">
                {stat.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-zinc-900">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Actions + Status */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Frequently used administrative operations
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                Add Product
              </button>
              <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100">
                View Products
              </button>
              <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100">
                View Analytics
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold">System Status</h3>
            <p className="mt-2 text-sm text-zinc-600">
              All core services are running normally. No incidents detected.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
              <span className="text-sm font-medium text-green-700">
                All Systems Operational
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} Admin Dashboard — Internal Use Only
        </div>
      </footer>
    </div>
  );
}
