"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IcSave } from "./fields";

/**
 * Wraps an admin editor form: handles submit → server action → feedback.
 * - `stay` (e.g. the single Profile page): don't navigate; just reset pending and
 *   show "Tersimpan ✓". Avoids the stuck "Menyimpan…" button when backHref is the
 *   current page. (The server action already revalidated the public site.)
 * - otherwise (collections): navigate to the list, which shows the fresh row.
 */
export function FormShell({
  children,
  onSave,
  backHref,
  saveLabel = "Simpan",
  stay = false,
}: {
  children: React.ReactNode;
  onSave: () => Promise<void>;
  backHref: string;
  saveLabel?: string;
  stay?: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setErr(null);
    setOk(false);
    try {
      await onSave();
      if (stay) {
        setPending(false);
        setOk(true);
        setTimeout(() => setOk(false), 2500);
      } else {
        router.push(backHref);
        router.refresh();
      }
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Gagal menyimpan.");
      setPending(false);
    }
  }

  return (
    <form className="adm-form" onSubmit={submit}>
      {children}
      {err && <div className="adm-msg err">{err}</div>}
      {ok && <div className="adm-msg ok">Tersimpan ✓</div>}
      <div className="adm-actions">
        <button type="submit" className="adm-btn adm-btn-primary" disabled={pending}>
          <IcSave /> {pending ? "Menyimpan…" : saveLabel}
        </button>
        <Link href={backHref} className="adm-btn adm-btn-ghost">{stay ? "Kembali" : "Batal"}</Link>
      </div>
    </form>
  );
}
