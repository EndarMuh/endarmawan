// Edge-safe session helpers (jose only — NO next/headers, NO bcrypt here so this
// module can be imported from `proxy.ts`, which runs in the Edge runtime).
import { SignJWT, jwtVerify } from "jose";

export const AUTH_COOKIE = "port_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type SessionPayload = { sub: string; email: string };

const secret = () => {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(s);
};

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (typeof payload.sub === "string" && typeof payload.email === "string") {
      return { sub: payload.sub, email: payload.email };
    }
    return null;
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = MAX_AGE;
