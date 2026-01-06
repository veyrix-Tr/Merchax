import { getDashboardAnalytics } from '@/lib/analytics';
import SalesChart from '@/components/charts/SalesChart';
import StockChart from '@/components/charts/StockChart';

export default async function AdminDashboardPage() {
  const analytics = await getDashboardAnalytics();
  
  const stats = [
    { label: "Total Products", value: analytics.summary.totalProducts.toString() },
    { label: "Total Stock", value: analytics.summary.totalStock.toLocaleString() },
    { label: "Categories", value: analytics.summary.totalCategories.toString() },
    { label: "Low Stock", value: analytics.summary.lowStockItems.toString() },
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Sales Overview</h2>
          <p className="mt-1 text-sm text-zinc-500">Monthly sales performance</p>
          <div className="mt-6">
            <SalesChart data={analytics.charts.sales} />
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Stock Distribution</h2>
          <p className="mt-1 text-sm text-zinc-500">Stock levels by category</p>
          <div className="mt-6">
            <StockChart data={analytics.charts.stockDistribution} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Quick Stats</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Key inventory metrics at a glance.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-zinc-50 p-4">
            <div className="text-sm font-medium text-zinc-900">Total Value</div>
            <div className="mt-1 text-sm text-zinc-600">${analytics.summary.totalValue.toLocaleString()}</div>
          </div>
          <div className="rounded-xl bg-zinc-50 p-4">
            <div className="text-sm font-medium text-zinc-900">Low Stock Items</div>
            <div className="mt-1 text-sm text-zinc-600">{analytics.summary.lowStockItems} products</div>
          </div>
          <div className="rounded-xl bg-zinc-50 p-4">
            <div className="text-sm font-medium text-zinc-900">Last Update</div>
            <div className="mt-1 text-sm text-zinc-600">Live data</div>
          </div>
        </div>
      </div>
    </div>
  );
}
