import Link from "next/link";
import { notFound } from "next/navigation";
import { findOrganization } from "@/lib/admin-data";
import { blankOrganization } from "@/lib/admin-types";
import { OrganizationForm } from "@/app/admin/_components/EntityForms";
import { IcBack } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function OrganizationEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const initial = isNew ? blankOrganization() : await findOrganization(id);
  if (!initial) notFound();

  return (
    <>
      <div className="adm-crumbs">
        <Link href="/admin/organizations"><IcBack /> Organisasi</Link>
      </div>
      <div className="adm-head">
        <div><h1>{isNew ? "Tambah organisasi" : "Edit organisasi"}</h1></div>
      </div>
      <OrganizationForm initial={initial} />
    </>
  );
}
