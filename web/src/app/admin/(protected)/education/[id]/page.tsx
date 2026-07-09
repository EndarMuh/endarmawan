import Link from "next/link";
import { notFound } from "next/navigation";
import { findEducation } from "@/lib/admin-data";
import { blankEducation } from "@/lib/admin-types";
import { EducationForm } from "@/app/admin/_components/EntityForms";
import { IcBack } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function EducationEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const initial = isNew ? blankEducation() : await findEducation(id);
  if (!initial) notFound();

  return (
    <>
      <div className="adm-crumbs">
        <Link href="/admin/education"><IcBack /> Pendidikan</Link>
      </div>
      <div className="adm-head">
        <div><h1>{isNew ? "Tambah pendidikan" : "Edit pendidikan"}</h1></div>
      </div>
      <EducationForm initial={initial} />
    </>
  );
}
