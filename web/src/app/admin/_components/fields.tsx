"use client";

import { useState } from "react";
import type { L, LList, Fact, Stat } from "@/lib/content";

/* ---------------- icons ---------------- */
const sv = { fill: "none", stroke: "currentColor", strokeWidth: 2, viewBox: "0 0 24 24" } as const;
export const IcPlus = () => (<svg {...sv}><path d="M12 5v14M5 12h14" /></svg>);
export const IcTrash = () => (<svg {...sv}><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>);
export const IcUp = () => (<svg {...sv}><path d="M12 19V5M5 12l7-7 7 7" /></svg>);
export const IcDown = () => (<svg {...sv}><path d="M12 5v14M19 12l-7 7-7-7" /></svg>);
export const IcSave = () => (<svg {...sv}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>);
export const IcBack = () => (<svg {...sv}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>);
export const IcEdit = () => (<svg {...sv}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>);
export const IcLogout = () => (<svg {...sv}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>);

/* ---------------- primitives ---------------- */
export function Text({
  label, value, onChange, placeholder, hint, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; hint?: string; type?: string;
}) {
  return (
    <div className="adm-field">
      <label className="adm-label">{label}{hint && <span className="hint">{hint}</span>}</label>
      <input className="adm-input" type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function Toggle({ label, value, onChange, hint }: {
  label: string; value: boolean; onChange: (v: boolean) => void; hint?: string;
}) {
  return (
    <div className="adm-field">
      <label className="adm-label" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)}
          style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
        <span>{label}{hint && <span className="hint">{hint}</span>}</span>
      </label>
    </div>
  );
}

/** Bilingual EN/ID paired input (or textarea). */
export function Bilingual({
  label, value, onChange, textarea, hint,
}: {
  label: string; value: L; onChange: (v: L) => void; textarea?: boolean; hint?: string;
}) {
  const one = (tag: "EN" | "ID", key: "en" | "id") => {
    const common = {
      className: textarea ? "adm-textarea" : "adm-input",
      value: value[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange({ ...value, [key]: e.target.value }),
    };
    return (
      <div>
        <span className="lang-tag">{tag}</span>
        {textarea ? <textarea {...common} /> : <input {...common} />}
      </div>
    );
  };
  return (
    <div className="adm-field">
      <label className="adm-label">{label}{hint && <span className="hint">{hint}</span>}</label>
      <div className="adm-bi">
        {one("EN", "en")}
        {one("ID", "id")}
      </div>
    </div>
  );
}

// NOTE: we keep the *raw* textarea text in local state and only split into an array
// for the parent's onChange. Trimming/filtering on every keystroke (the old bug) ate
// spaces as you typed them — you couldn't put a space between words. Cleanup of blank
// lines happens on the parent value; the server action also trims on save.
function splitLines(s: string): string[] {
  return s.split("\n").map((l) => l.trim()).filter(Boolean);
}

/** string[] editor — one item per line. */
export function Lines({ label, value, onChange, hint }: {
  label: string; value: string[]; onChange: (v: string[]) => void; hint?: string;
}) {
  const [raw, setRaw] = useState(value.join("\n"));
  return (
    <div className="adm-field">
      <label className="adm-label">{label}<span className="hint">{hint ?? "satu item per baris"}</span></label>
      <textarea className="adm-textarea mono" value={raw}
        onChange={(e) => { setRaw(e.target.value); onChange(splitLines(e.target.value)); }} />
    </div>
  );
}

/** Bilingual list (LList) — two textareas, one item per line. */
export function BilingualLines({ label, value, onChange, hint }: {
  label: string; value: LList; onChange: (v: LList) => void; hint?: string;
}) {
  const [rawEn, setRawEn] = useState(value.en.join("\n"));
  const [rawId, setRawId] = useState(value.id.join("\n"));
  return (
    <div className="adm-field">
      <label className="adm-label">{label}<span className="hint">{hint ?? "satu item per baris"}</span></label>
      <div className="adm-bi">
        <div>
          <span className="lang-tag">EN</span>
          <textarea className="adm-textarea mono" value={rawEn}
            onChange={(e) => { setRawEn(e.target.value); onChange({ ...value, en: splitLines(e.target.value) }); }} />
        </div>
        <div>
          <span className="lang-tag">ID</span>
          <textarea className="adm-textarea mono" value={rawId}
            onChange={(e) => { setRawId(e.target.value); onChange({ ...value, id: splitLines(e.target.value) }); }} />
        </div>
      </div>
    </div>
  );
}

/* ---------------- file uploader ---------------- */
export function Uploader({
  label, value, onChange, kind = "image", hint,
}: {
  label: string; value: string | null; onChange: (url: string | null) => void;
  kind?: "image" | "pdf"; hint?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const accept = kind === "pdf" ? "application/pdf" : "image/*";

  async function upload(file: File) {
    setBusy(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", kind);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Gagal mengunggah.");
      onChange(json.url as string);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Gagal mengunggah.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-field">
      <label className="adm-label">{label}{hint && <span className="hint">{hint}</span>}</label>
      <div className="adm-upload">
        <div className="preview">
          {value && kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" />
          ) : value && kind === "pdf" ? (
            "PDF"
          ) : (
            "—"
          )}
        </div>
        <div>
          <input type="file" accept={accept} disabled={busy}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
          <div className="meta">{busy ? "Mengunggah…" : value ?? "Belum ada file."}</div>
          {err && <div className="meta" style={{ color: "#e5484d" }}>{err}</div>}
        </div>
        {value && (
          <button type="button" className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => onChange(null)}>
            Hapus
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- facts repeater ---------------- */
const emptyL: L = { en: "", id: "" };

export function FactsEditor({ value, onChange }: { value: Fact[]; onChange: (v: Fact[]) => void }) {
  const set = (i: number, f: Fact) => onChange(value.map((v, j) => (j === i ? f : v)));
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const add = () => onChange([...value, { k: { ...emptyL }, v: { ...emptyL } }]);

  return (
    <div className="adm-field">
      <label className="adm-label">Facts <span className="hint">baris kunci → nilai di panel About</span></label>
      <div className="adm-repeat">
        {value.map((f, i) => (
          <div className="adm-row-item" key={i}>
            <div className="adm-row-head">
              <span className="idx">#{i + 1}</span>
              <button type="button" className="adm-iconbtn danger" onClick={() => remove(i)} aria-label="Hapus"><IcTrash /></button>
            </div>
            <Bilingual label="Kunci" value={f.k} onChange={(k) => set(i, { ...f, k })} />
            <Bilingual label="Nilai" value={f.v} onChange={(v) => set(i, { ...f, v })} />
          </div>
        ))}
      </div>
      <button type="button" className="adm-btn adm-btn-sm" style={{ marginTop: 10 }} onClick={add}>
        <IcPlus /> Tambah fact
      </button>
    </div>
  );
}

/* ---------------- stats repeater ---------------- */
export function StatsEditor({ value, onChange }: { value: Stat[]; onChange: (v: Stat[]) => void }) {
  const set = (i: number, s: Stat) => onChange(value.map((v, j) => (j === i ? s : v)));
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const add = () => onChange([...value, { n: 0, dec: 0, suf: "", lbl: { ...emptyL } }]);

  return (
    <div className="adm-field">
      <label className="adm-label">Statistik <span className="hint">angka besar di bawah hero</span></label>
      <div className="adm-repeat">
        {value.map((st, i) => (
          <div className="adm-row-item" key={i}>
            <div className="adm-row-head">
              <span className="idx">#{i + 1}</span>
              <button type="button" className="adm-iconbtn danger" onClick={() => remove(i)} aria-label="Hapus"><IcTrash /></button>
            </div>
            <div className="adm-bi" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <div>
                <span className="lang-tag">ANGKA</span>
                <input className="adm-input" type="number" step="any" value={st.n}
                  onChange={(e) => set(i, { ...st, n: Number(e.target.value) })} />
              </div>
              <div>
                <span className="lang-tag">DESIMAL</span>
                <input className="adm-input" type="number" min={0} max={3} value={st.dec}
                  onChange={(e) => set(i, { ...st, dec: Number(e.target.value) })} />
              </div>
              <div>
                <span className="lang-tag">SUFIKS</span>
                <input className="adm-input" value={st.suf} placeholder="+ / %"
                  onChange={(e) => set(i, { ...st, suf: e.target.value })} />
              </div>
            </div>
            <Bilingual label="Label" value={st.lbl} onChange={(lbl) => set(i, { ...st, lbl })} />
          </div>
        ))}
      </div>
      <button type="button" className="adm-btn adm-btn-sm" style={{ marginTop: 10 }} onClick={add}>
        <IcPlus /> Tambah statistik
      </button>
    </div>
  );
}
