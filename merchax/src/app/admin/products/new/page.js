"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function AdminNewProductPage() {
  const router = useRouter();

  const steps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Pricing & Stock" },
    { id: 3, title: "Images" },
    { id: 4, title: "Review & Submit" },
  ];

  const basicSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
  });

  const pricingSchema = z.object({
    price: z
      .string()
      .min(1, "Price is required")
      .refine((v) => !Number.isNaN(Number(v)) && Number(v) >= 0, "Enter a valid price"),
    stock: z
      .string()
      .min(1, "Stock is required")
      .refine(
        (v) => Number.isInteger(Number(v)) && Number(v) >= 0,
        "Enter a valid stock"
      ),
  });

  const imagesSchema = z.object({
    image1: z.string().optional(),
    image2: z.string().optional(),
  });

  const initialState = {
    stepIndex: 0,
    values: {
      name: "",
      category: "",
      price: "",
      stock: "",
      image1: "",
      image2: "",
    },
    errors: {},
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_VALUE": {
        return {
          ...state,
          values: { ...state.values, [action.field]: action.value },
        };
      }
      case "SET_ERRORS": {
        return { ...state, errors: action.errors };
      }
      case "NEXT": {
        return { ...state, stepIndex: Math.min(state.stepIndex + 1, steps.length - 1) };
      }
      case "BACK": {
        return { ...state, stepIndex: Math.max(state.stepIndex - 1, 0) };
      }
      case "RESET": {
        return initialState;
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { stepIndex, values, errors } = state;

  const validateCurrentStep = () => {
    let result;
    if (stepIndex === 0) result = basicSchema.safeParse(values);
    else if (stepIndex === 1) result = pricingSchema.safeParse(values);
    else if (stepIndex === 2) result = imagesSchema.safeParse(values);
    else result = z.object({}).safeParse({});

    if (result.success) {
      dispatch({ type: "SET_ERRORS", errors: {} });
      return true;
    }

    const nextErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path?.[0];
      if (key && !nextErrors[key]) nextErrors[key] = issue.message;
    }
    dispatch({ type: "SET_ERRORS", errors: nextErrors });
    return false;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    dispatch({ type: "NEXT" });
  };

  const handleBack = () => {
    dispatch({ type: "SET_ERRORS", errors: {} });
    dispatch({ type: "BACK" });
  };

  const handleCancel = () => {
    router.push("/admin/products");
  };

  const handleSubmit = () => {
    const a = basicSchema.safeParse(values);
    const b = pricingSchema.safeParse(values);
    const c = imagesSchema.safeParse(values);

    if (!a.success || !b.success || !c.success) {
      const nextErrors = {};
      for (const r of [a, b, c]) {
        if (r.success) continue;
        for (const issue of r.error.issues) {
          const key = issue.path?.[0];
          if (key && !nextErrors[key]) nextErrors[key] = issue.message;
        }
      }
      dispatch({ type: "SET_ERRORS", errors: nextErrors });
      return;
    }

    (async () => {
      try {
        const payload = {
          name: values.name,
          category: values.category,
          price: Number(values.price),
          stock: Number(values.stock),
          description: "",
          images: [values.image1, values.image2].filter(Boolean),
        };

        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.log("Failed to create product");
          return;
        }

        await res.json();
        dispatch({ type: "RESET" });
        router.push("/admin/products");
      } catch {
        console.log("Failed to create product");
      }
    })();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Add Product</h1>
        <p className="mt-1 text-sm text-zinc-500">Create a new product (mock).</p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {steps.map((s, idx) => {
            const isActive = idx === stepIndex;
            const isDone = idx < stepIndex;
            const pill = isActive
              ? "bg-zinc-900 text-white"
              : isDone
                ? "bg-zinc-100 text-zinc-900"
                : "bg-zinc-50 text-zinc-600";

            return (
              <div
                key={s.id}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${pill}`}
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs">
                  {s.id}
                </span>
                {s.title}
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          {stepIndex === 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-zinc-700" htmlFor="name">
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={(e) =>
                    dispatch({ type: "SET_VALUE", field: "name", value: e.target.value })
                  }
                  placeholder="e.g. Classic Hoodie"
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-300"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-rose-700">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-700" htmlFor="category">
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  value={values.category}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_VALUE",
                      field: "category",
                      value: e.target.value,
                    })
                  }
                  placeholder="e.g. Apparel"
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-300"
                />
                {errors.category && (
                  <p className="mt-2 text-sm text-rose-700">{errors.category}</p>
                )}
              </div>
            </div>
          )}

          {stepIndex === 1 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-zinc-700" htmlFor="price">
                  Price
                </label>
                <div className="mt-2 flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-2">
                  <span className="text-sm text-zinc-500">$</span>
                  <input
                    id="price"
                    type="text"
                    value={values.price}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_VALUE",
                        field: "price",
                        value: e.target.value,
                      })
                    }
                    placeholder="0.00"
                    className="ml-2 w-full bg-transparent text-sm text-zinc-900 outline-none"
                  />
                </div>
                {errors.price && (
                  <p className="mt-2 text-sm text-rose-700">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-700" htmlFor="stock">
                  Stock
                </label>
                <input
                  id="stock"
                  type="text"
                  value={values.stock}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_VALUE",
                      field: "stock",
                      value: e.target.value,
                    })
                  }
                  placeholder="e.g. 25"
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-300"
                />
                {errors.stock && (
                  <p className="mt-2 text-sm text-rose-700">{errors.stock}</p>
                )}
              </div>
            </div>
          )}

          {stepIndex === 2 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-zinc-700" htmlFor="image1">
                  Image URL (Placeholder)
                </label>
                <input
                  id="image1"
                  type="text"
                  value={values.image1}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_VALUE",
                      field: "image1",
                      value: e.target.value,
                    })
                  }
                  placeholder="https://..."
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-300"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700" htmlFor="image2">
                  Image URL (Placeholder)
                </label>
                <input
                  id="image2"
                  type="text"
                  value={values.image2}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_VALUE",
                      field: "image2",
                      value: e.target.value,
                    })
                  }
                  placeholder="https://..."
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-300"
                />
              </div>
            </div>
          )}

          {stepIndex === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl bg-zinc-50 p-4">
                <div className="text-sm font-semibold text-zinc-900">Review</div>
                <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium text-zinc-500">Name</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{values.name || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-zinc-500">Category</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{values.category || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-zinc-500">Price</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{values.price || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-zinc-500">Stock</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{values.stock || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-zinc-500">Image 1</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{values.image1 || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-zinc-500">Image 2</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{values.image2 || "-"}</dd>
                  </div>
                </dl>
              </div>

              {(errors.name || errors.category || errors.price || errors.stock) && (
                <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
                  Please fix the highlighted fields.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={stepIndex === 0}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 disabled:opacity-50"
            >
              Back
            </button>

            {stepIndex < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
