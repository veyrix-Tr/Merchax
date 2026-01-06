import { NextResponse } from "next/server";

import { connectDB } from '@/lib/db';
import Admin from '@/models/Admin';
import { requireAdminFromRequest } from '@/lib/auth';

export async function POST(request) {
  const requester = requireAdminFromRequest(request);
  if (!requester) {
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

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
    }

    await Admin.create({ email, password, role: "admin" });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
