import Link from "next/link";
import { headers } from "next/headers";
import ProductDetail from "@/components/ProductDetail";

async function getProducts() {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const cookie = h.get("cookie") || "";

  if (!host) {
    return [];
  }

  try {
    const res = await fetch(`${protocol}://${host}/api/products`, {
      cache: "no-store",
      headers: {
        cookie,
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data?.products) ? data.products : [];
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Products</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage your product catalog.</p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          New Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Image
                </th>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50">
                  <td className="px-6 py-4">
                    {p.image ? (
                      <img 
                        src={p.image} 
                        alt={p.name}
                        className="h-10 w-10 rounded-lg object-cover border border-zinc-200"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg border border-zinc-200 bg-zinc-100" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{p.category}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductDetail product={products[0]} />
    </div>
  );
}
