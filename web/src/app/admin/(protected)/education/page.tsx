import Link from "next/link";
import { loadEducations } from "@/lib/admin-data";
import { RowTools } from "@/app/admin/_components/RowTools";
import { IcEdit, IcPlus } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function EducationList() {
  const items = await loadEducations();
  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Pendidikan</h1>
          <p>Riwayat pendidikan formal.</p>
        </div>
        <Link href="/admin/education/new" className="adm-btn adm-btn-primary"><IcPlus /> Tambah</Link>
      </div>

      {items.length === 0 ? (
        <div className="adm-empty">Belum ada pendidikan. Klik “Tambah” untuk membuat.</div>
      ) : (
        <div className="adm-list">
          {items.map((it, i) => (
            <div className="adm-item" key={it.id}>
              <div className="grow">
                <div className="title">{it.school}</div>
                <div className="sub">{it.degree.en} · {it.period.en}</div>
              </div>
              <Link href={`/admin/education/${it.id}`} className="adm-iconbtn" aria-label="Edit"><IcEdit /></Link>
              <RowTools type="education" id={it.id} isFirst={i === 0} isLast={i === items.length - 1} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
