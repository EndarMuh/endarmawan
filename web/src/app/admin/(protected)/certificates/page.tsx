import Link from "next/link";
import { loadCertificates } from "@/lib/admin-data";
import { RowTools } from "@/app/admin/_components/RowTools";
import { IcEdit, IcPlus } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function CertificatesList() {
  const items = await loadCertificates();
  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Sertifikat</h1>
          <p>Sertifikat & kredensial.</p>
        </div>
        <Link href="/admin/certificates/new" className="adm-btn adm-btn-primary"><IcPlus /> Tambah</Link>
      </div>

      {items.length === 0 ? (
        <div className="adm-empty">Belum ada sertifikat. Klik “Tambah” untuk membuat.</div>
      ) : (
        <div className="adm-list">
          {items.map((it, i) => (
            <div className="adm-item" key={it.id}>
              {it.fileUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <a href={it.fileUrl} target="_blank" rel="noopener noreferrer" className="adm-thumb" title="Lihat penuh">
                  <img src={it.fileUrl} alt={it.name} />
                </a>
              )}
              <div className="grow">
                <div className="title">{it.name}</div>
                <div className="sub">{it.sub.en}</div>
              </div>
              <Link href={`/admin/certificates/${it.id}`} className="adm-iconbtn" aria-label="Edit"><IcEdit /></Link>
              <RowTools type="certificates" id={it.id} isFirst={i === 0} isLast={i === items.length - 1} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
