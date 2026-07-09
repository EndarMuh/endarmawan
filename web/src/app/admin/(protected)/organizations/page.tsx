import Link from "next/link";
import { loadOrganizations } from "@/lib/admin-data";
import { RowTools } from "@/app/admin/_components/RowTools";
import { IcEdit, IcPlus } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function OrganizationsList() {
  const items = await loadOrganizations();
  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Organisasi</h1>
          <p>Pengalaman berorganisasi.</p>
        </div>
        <Link href="/admin/organizations/new" className="adm-btn adm-btn-primary"><IcPlus /> Tambah</Link>
      </div>

      {items.length === 0 ? (
        <div className="adm-empty">Belum ada organisasi. Klik “Tambah” untuk membuat.</div>
      ) : (
        <div className="adm-list">
          {items.map((it, i) => (
            <div className="adm-item" key={it.id}>
              <div className="grow">
                <div className="title">{it.role.en}</div>
                <div className="sub">{it.org} · {it.period.en}</div>
              </div>
              <Link href={`/admin/organizations/${it.id}`} className="adm-iconbtn" aria-label="Edit"><IcEdit /></Link>
              <RowTools type="organizations" id={it.id} isFirst={i === 0} isLast={i === items.length - 1} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
