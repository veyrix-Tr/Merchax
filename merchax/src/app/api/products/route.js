import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Product from "../../../../models/Product";
import { requireAdminFromRequest } from "../../../../lib/auth";

const DEFAULT_PRODUCTS = [
  {
    name: "Classic Hoodie",
    category: "Apparel",
    price: 49.99,
    stock: 32,
  },
  {
    name: "Leather Wallet",
    category: "Accessories",
    price: 29.0,
    stock: 0,
  },
  {
    name: "Running Shoes",
    category: "Footwear",
    price: 89.5,
    stock: 14,
  },
  {
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 79.99,
    stock: 6,
  },
  {
    name: "Denim Jacket",
    category: "Apparel",
    price: 64.0,
    stock: 18,
  },
];

export async function GET(request) {
  const admin = requireAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(DEFAULT_PRODUCTS);
    }

    const docs = await Product.find({}).sort({ createdAt: -1 }).lean();
    const products = docs.map((p) => ({
      id: String(p._id),
      name: p.name,
      category: p.category,
      price: p.price,
      stock: p.stock,
      description: "",
    }));

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    const message =
      error?.message === "MONGODB_URI is not defined"
        ? "MONGODB_URI is not defined"
        : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request) {
  const admin = requireAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, category, price, stock } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!category || typeof category !== "string") {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    const parsedPrice = typeof price === "number" ? price : Number(price);
    const parsedStock = typeof stock === "number" ? stock : Number(stock);

    if (Number.isNaN(parsedPrice) || Number.isNaN(parsedStock)) {
      return NextResponse.json(
        { error: "Price and stock must be numbers" },
        { status: 400 }
      );
    }

    const doc = await Product.create({
      name,
      category,
      price: parsedPrice,
      stock: parsedStock,
      image: typeof body.image === "string" ? body.image : "",
    });

    const product = {
      id: String(doc._id),
      name: doc.name,
      category: doc.category,
      price: doc.price,
      stock: doc.stock,
      description: "",
    };

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    const message =
      error?.message === "MONGODB_URI is not defined"
        ? "MONGODB_URI is not defined"
        : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
