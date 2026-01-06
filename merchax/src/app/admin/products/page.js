import Link from "next/link";
import { headers } from "next/headers";
import ProductDetail from "@/components/ProductDetail";

async function getProducts() {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const cookie = h.get("cookie") || "";

  if (!host) return [];

  try {
    const res = await fetch(`${protocol}://${host}/api/products`, {
      cache: "no-store",
      headers: { cookie },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data?.products) ? data.products : [];
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Products
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            View and manage your product catalog.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          New Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Product
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
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200">
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-zinc-500"
                  >
                    No products found. Create your first product to get started.
                  </td>
                </tr>
              )}

              {products.map((p) => (
                <tr
                  key={p.id}
                  className="transition hover:bg-zinc-50"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-10 w-10 rounded-lg border border-zinc-200 object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg border border-zinc-200 bg-zinc-100" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          {p.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          ID: {p.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {p.category}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                    ${p.price.toFixed(2)}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    {p.stock > 0 ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        In stock ({p.stock})
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-700">
                        Out of stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel (example) */}
      {products[0] && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">
            Product Details
          </h2>
          <ProductDetail product={products[0]} />
        </div>
      )}
    </div>
  );
}
