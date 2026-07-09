"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";
import type { LoginState } from "@/lib/admin-types";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action}>
      <input type="hidden" name="next" value={next} />
      <div className="adm-field">
        <label className="adm-label" htmlFor="email">Email</label>
        <input className="adm-input" id="email" name="email" type="email"
          autoComplete="username" required />
      </div>
      <div className="adm-field">
        <label className="adm-label" htmlFor="password">Password</label>
        <input className="adm-input" id="password" name="password" type="password"
          autoComplete="current-password" required />
      </div>
      {state.error && <div className="adm-msg err" style={{ marginBottom: 14 }}>{state.error}</div>}
      <button type="submit" className="adm-btn adm-btn-primary"
        style={{ width: "100%", justifyContent: "center" }} disabled={pending}>
        {pending ? "Masuk…" : "Masuk"}
      </button>
    </form>
  );
}
