import Link from "next/link";
import { loadProjects } from "@/lib/admin-data";
import { RowTools } from "@/app/admin/_components/RowTools";
import { IcEdit, IcPlus } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function ProjectsList() {
  const items = await loadProjects();
  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Proyek</h1>
          <p>Proyek pilihan. Kategori menentukan filter di situs.</p>
        </div>
        <Link href="/admin/projects/new" className="adm-btn adm-btn-primary"><IcPlus /> Tambah</Link>
      </div>

      {items.length === 0 ? (
        <div className="adm-empty">Belum ada proyek. Klik “Tambah” untuk membuat.</div>
      ) : (
        <div className="adm-list">
          {items.map((it, i) => (
            <div className="adm-item" key={it.id}>
              <div className="grow">
                <div className="title">{it.name}</div>
                <div className="sub">{it.role.en} · {it.period.en}</div>
              </div>
              <span className="pill">{it.category}</span>
              <Link href={`/admin/projects/${it.id}`} className="adm-iconbtn" aria-label="Edit"><IcEdit /></Link>
              <RowTools type="projects" id={it.id} isFirst={i === 0} isLast={i === items.length - 1} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
