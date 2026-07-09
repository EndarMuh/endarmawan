import Link from "next/link";
import { notFound } from "next/navigation";
import { findSkill } from "@/lib/admin-data";
import { blankSkill } from "@/lib/admin-types";
import { SkillForm } from "@/app/admin/_components/EntityForms";
import { IcBack } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function SkillEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const initial = isNew ? blankSkill() : await findSkill(id);
  if (!initial) notFound();

  return (
    <>
      <div className="adm-crumbs">
        <Link href="/admin/skills"><IcBack /> Keahlian</Link>
      </div>
      <div className="adm-head">
        <div><h1>{isNew ? "Tambah grup keahlian" : "Edit grup keahlian"}</h1></div>
      </div>
      <SkillForm initial={initial} />
    </>
  );
}
