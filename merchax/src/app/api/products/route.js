import { NextResponse } from "next/server";

let products = [
  {
    id: "p1",
    name: "Classic Hoodie",
    category: "Apparel",
    price: 49.99,
    stock: 32,
    description: "Soft fleece hoodie with a relaxed fit and durable stitching.",
  },
  {
    id: "p2",
    name: "Leather Wallet",
    category: "Accessories",
    price: 29.0,
    stock: 0,
    description:
      "Minimalist leather wallet with multiple card slots and a slim profile.",
  },
  {
    id: "p3",
    name: "Running Shoes",
    category: "Footwear",
    price: 89.5,
    stock: 14,
    description: "Lightweight running shoes designed for everyday comfort and support.",
  },
  {
    id: "p4",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 79.99,
    stock: 6,
    description: "Compact earbuds with clear sound and a portable charging case.",
  },
  {
    id: "p5",
    name: "Denim Jacket",
    category: "Apparel",
    price: 64.0,
    stock: 18,
    description: "Classic denim jacket with a timeless wash and comfortable fit.",
  },
];

export async function GET() {
  return NextResponse.json({ products }, { status: 200 });
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, category, price, stock, description } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!category || typeof category !== "string") {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }

  const nextProduct = {
    id: body.id || `p_${Date.now()}`,
    name,
    category,
    price: typeof price === "number" ? price : Number(price),
    stock: typeof stock === "number" ? stock : Number(stock),
    description: typeof description === "string" ? description : "",
  };

  if (Number.isNaN(nextProduct.price) || Number.isNaN(nextProduct.stock)) {
    return NextResponse.json(
      { error: "Price and stock must be numbers" },
      { status: 400 }
    );
  }

  products = [nextProduct, ...products];

  return NextResponse.json({ product: nextProduct }, { status: 201 });
}
