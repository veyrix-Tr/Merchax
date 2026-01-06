import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-8 py-12">
        {/* Header */}
        <header className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
              <span className="text-sm font-semibold">AD</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-zinc-500">
                Product management system
              </p>
            </div>
          </div>

          <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-200">
            Logout
          </button>
        </header>

        {/* Welcome Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Welcome back, Admin
          </h2>
          <p className="mt-2 max-w-xl text-zinc-600">
            Manage products, monitor inventory, and review performance from one
            central dashboard.
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
              <p className="text-sm text-zinc-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Actions */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                Add New Product
              </button>
              <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-200">
                View Products
              </button>
              <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-200">
                View Analytics
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold">System Status</h3>
            <p className="mt-2 text-sm text-zinc-600">
              All services are running normally. No action required.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              Operational
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto pt-12 text-sm text-zinc-500">
          © {new Date().getFullYear()} Admin Dashboard. Internal use only.
        </footer>
      </main>
    </div>
  );
}
