// Server-side auth helpers (use inside Server Components / Server Actions / Route
// Handlers — i.e. the Node runtime). Reads the httpOnly cookie via next/headers.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTH_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifySession,
  type SessionPayload,
} from "./session";

/** Read + verify the current session, or null if signed out. */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

/** Redirect to /admin/login if there is no valid session; otherwise return it. */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

/** Issue the session cookie (call after a successful password check). */
export async function createSessionCookie(payload: SessionPayload): Promise<void> {
  const token = await signSession(payload);
  const store = await cookies();
  store.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/** Clear the session cookie. */
export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(AUTH_COOKIE);
}
