import Link from "next/link";
import { notFound } from "next/navigation";
import { findCertificate } from "@/lib/admin-data";
import { blankCertificate } from "@/lib/admin-types";
import { CertificateForm } from "@/app/admin/_components/EntityForms";
import { IcBack } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function CertificateEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const initial = isNew ? blankCertificate() : await findCertificate(id);
  if (!initial) notFound();

  return (
    <>
      <div className="adm-crumbs">
        <Link href="/admin/certificates"><IcBack /> Sertifikat</Link>
      </div>
      <div className="adm-head">
        <div><h1>{isNew ? "Tambah sertifikat" : "Edit sertifikat"}</h1></div>
      </div>
      <CertificateForm initial={initial} />
    </>
  );
}
