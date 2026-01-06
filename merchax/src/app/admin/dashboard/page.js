import { getDashboardAnalytics } from "@/lib/analytics";
import SalesChart from "@/components/charts/SalesChart";
import StockChart from "@/components/charts/StockChart";

export default async function AdminDashboardPage() {
  const analytics = await getDashboardAnalytics();

  const stats = [
    {
      label: "Total Products",
      value: analytics.summary.totalProducts.toString(),
    },
    {
      label: "Total Stock",
      value: analytics.summary.totalStock.toLocaleString(),
    },
    {
      label: "Categories",
      value: analytics.summary.totalCategories.toString(),
    },
    {
      label: "Low Stock Items",
      value: analytics.summary.lowStockItems.toString(),
      danger: analytics.summary.lowStockItems > 0,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Real-time overview of inventory performance and stock health.
        </p>
      </div>

      {/* KPI Stats */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <p className="text-sm font-medium text-zinc-500">
              {stat.label}
            </p>
            <p
              className={`mt-2 text-3xl font-semibold tracking-tight ${
                stat.danger ? "text-rose-600" : "text-zinc-900"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-zinc-900">
              Sales Overview
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Monthly revenue and sales trends
            </p>
          </div>
          <SalesChart data={analytics.charts.sales} />
        </div>

        {/* Stock */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-zinc-900">
              Stock Distribution
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Inventory levels by category
            </p>
          </div>
          <StockChart data={analytics.charts.stockDistribution} />
        </div>
      </section>

      {/* Quick Insights */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            Quick Insights
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Key inventory metrics at a glance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="text-sm font-medium text-zinc-900">
              Total Inventory Value
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              ${analytics.summary.totalValue.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="text-sm font-medium text-zinc-900">
              Low Stock Products
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              {analytics.summary.lowStockItems} items
            </p>
          </div>

          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="text-sm font-medium text-zinc-900">
              Data Status
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              Live · Auto-updated
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
