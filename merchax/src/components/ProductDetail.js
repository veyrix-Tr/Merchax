export default function ProductDetail({ product }) {
  if (!product) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 shrink-0 rounded-xl border border-zinc-200 bg-zinc-100" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">{product.name}</h2>
              <p className="mt-1 text-sm text-zinc-500">{product.category}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-zinc-500">Price</div>
              <div className="text-base font-semibold text-zinc-900">
                ${Number(product.price || 0).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-zinc-50 p-3">
              <div className="text-xs font-medium text-zinc-500">Stock</div>
              <div className="mt-1 text-sm font-semibold text-zinc-900">
                {product.stock}
              </div>
            </div>
            <div className="rounded-xl bg-zinc-50 p-3">
              <div className="text-xs font-medium text-zinc-500">SKU</div>
              <div className="mt-1 text-sm font-semibold text-zinc-900">
                {product.sku || "SKU-0001"}
              </div>
            </div>
            <div className="rounded-xl bg-zinc-50 p-3">
              <div className="text-xs font-medium text-zinc-500">Status</div>
              <div className="mt-1 text-sm font-semibold text-zinc-900">
                {product.status || "Active"}
              </div>
            </div>
            <div className="rounded-xl bg-zinc-50 p-3">
              <div className="text-xs font-medium text-zinc-500">Category</div>
              <div className="mt-1 text-sm font-semibold text-zinc-900">
                {product.category}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-medium text-zinc-900">Description</div>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              {product.description ||
                "Mock product description. This is a static server-rendered component."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
