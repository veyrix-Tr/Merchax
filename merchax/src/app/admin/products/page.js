const products = [
  {
    name: "Classic Hoodie",
    category: "Apparel",
    price: 49.99,
    stock: 32,
    status: "Active",
  },
  {
    name: "Leather Wallet",
    category: "Accessories",
    price: 29.0,
    stock: 0,
    status: "Out of Stock",
  },
  {
    name: "Running Shoes",
    category: "Footwear",
    price: 89.5,
    stock: 14,
    status: "Active",
  },
  {
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 79.99,
    stock: 6,
    status: "Low Stock",
  },
  {
    name: "Denim Jacket",
    category: "Apparel",
    price: 64.0,
    stock: 18,
    status: "Active",
  },
];

function StatusPill({ status }) {
  const styles =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : status === "Low Stock"
        ? "bg-amber-50 text-amber-700 ring-amber-100"
        : "bg-rose-50 text-rose-700 ring-rose-100";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}
    >
      {status}
    </span>
  );
}

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Products</h1>
        <p className="mt-1 text-sm text-zinc-500">Read-only list of products.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {products.map((p) => (
                <tr key={p.name} className="hover:bg-zinc-50">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{p.category}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{p.stock}</td>
                  <td className="px-6 py-4 text-sm">
                    <StatusPill status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
