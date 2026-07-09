import Link from "next/link";
import { loadSkills } from "@/lib/admin-data";
import { RowTools } from "@/app/admin/_components/RowTools";
import { IcEdit, IcPlus } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function SkillsList() {
  const items = await loadSkills();
  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Keahlian</h1>
          <p>Kelompok keahlian & perangkat.</p>
        </div>
        <Link href="/admin/skills/new" className="adm-btn adm-btn-primary"><IcPlus /> Tambah</Link>
      </div>

      {items.length === 0 ? (
        <div className="adm-empty">Belum ada grup keahlian. Klik “Tambah” untuk membuat.</div>
      ) : (
        <div className="adm-list">
          {items.map((it, i) => (
            <div className="adm-item" key={it.id}>
              <div className="grow">
                <div className="title">{it.title.en}</div>
                <div className="sub">{it.items.join(", ")}</div>
              </div>
              <span className="pill">{it.items.length}</span>
              <Link href={`/admin/skills/${it.id}`} className="adm-iconbtn" aria-label="Edit"><IcEdit /></Link>
              <RowTools type="skills" id={it.id} isFirst={i === 0} isLast={i === items.length - 1} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
