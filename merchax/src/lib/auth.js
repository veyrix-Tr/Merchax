import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "merchax_admin";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");
  return secret;
}

export function signAdminToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyAdminToken(token) {
  return jwt.verify(token, getJwtSecret());
}

export function setAuthCookie(response, token) {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookie(response) {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getAuthTokenFromCookies() {
  const store = await cookies();
  return store.get(AUTH_COOKIE_NAME)?.value || null;
}

export async function getAuthPayloadFromCookies() {
  const token = await getAuthTokenFromCookies();
  if (!token) return null;

  try {
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const payload = await getAuthPayloadFromCookies();
  if (!payload || payload.role !== "admin") return null;
  return payload;
}

export function getAuthTokenFromRequest(request) {
  return request?.cookies?.get?.(AUTH_COOKIE_NAME)?.value || null;
}

export function getAuthPayloadFromRequest(request) {
  const token = getAuthTokenFromRequest(request);
  if (!token) return null;

  try {
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

export function requireAdminFromRequest(request) {
  const payload = getAuthPayloadFromRequest(request);
  if (!payload || payload.role !== "admin") return null;
  return payload;
}
