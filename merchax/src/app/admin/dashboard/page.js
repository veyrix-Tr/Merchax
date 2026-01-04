export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Products", value: "128" },
    { label: "Total Stock", value: "2,460" },
    { label: "Categories", value: "12" },
    { label: "Out of Stock", value: "7" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Overview of your store inventory.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="text-sm font-medium text-zinc-500">{s.label}</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Quick Notes</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Static content for admin dashboard layout.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-zinc-50 p-4">
            <div className="text-sm font-medium text-zinc-900">Top Category</div>
            <div className="mt-1 text-sm text-zinc-600">Accessories</div>
          </div>
          <div className="rounded-xl bg-zinc-50 p-4">
            <div className="text-sm font-medium text-zinc-900">Low Stock</div>
            <div className="mt-1 text-sm text-zinc-600">12 products</div>
          </div>
          <div className="rounded-xl bg-zinc-50 p-4">
            <div className="text-sm font-medium text-zinc-900">Last Update</div>
            <div className="mt-1 text-sm text-zinc-600">Today</div>
          </div>
        </div>
      </div>
    </div>
  );
}
