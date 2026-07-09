import Link from "next/link";
import { loadExperiences } from "@/lib/admin-data";
import { RowTools } from "@/app/admin/_components/RowTools";
import { IcEdit, IcPlus } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function ExperienceList() {
  const items = await loadExperiences();
  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Pengalaman</h1>
          <p>Timeline pekerjaan & magang. Urutan di sini = urutan di situs.</p>
        </div>
        <Link href="/admin/experience/new" className="adm-btn adm-btn-primary"><IcPlus /> Tambah</Link>
      </div>

      {items.length === 0 ? (
        <div className="adm-empty">Belum ada pengalaman. Klik “Tambah” untuk membuat.</div>
      ) : (
        <div className="adm-list">
          {items.map((it, i) => (
            <div className="adm-item" key={it.id}>
              <div className="grow">
                <div className="title">{it.org}</div>
                <div className="sub">{it.role.en} · {it.period.en}</div>
              </div>
              <span className="pill">{it.current ? "Current" : it.type.en}</span>
              <Link href={`/admin/experience/${it.id}`} className="adm-iconbtn" aria-label="Edit"><IcEdit /></Link>
              <RowTools type="experience" id={it.id} isFirst={i === 0} isLast={i === items.length - 1} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
