import { NextResponse } from "next/server";

import { connectDB } from '@/lib/db';
import Admin from '@/models/Admin';
import { setAuthCookie, signAdminToken } from '@/lib/auth';

export async function POST(request) {
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

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await admin.comparePassword(password);

    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (admin.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = signAdminToken({
      sub: String(admin._id),
      role: admin.role,
      email: admin.email,
    });

    const response = NextResponse.json({ success: true }, { status: 200 });
    setAuthCookie(response, token);
    return response;
  } catch (error) {
    const message =
      error?.message === "JWT_SECRET is not defined" ||
      error?.message === "MONGODB_URI is not defined"
        ? error.message
        : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
