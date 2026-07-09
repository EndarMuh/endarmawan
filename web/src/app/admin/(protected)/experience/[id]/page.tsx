import Link from "next/link";
import { notFound } from "next/navigation";
import { findExperience } from "@/lib/admin-data";
import { blankExperience } from "@/lib/admin-types";
import { ExperienceForm } from "@/app/admin/_components/EntityForms";
import { IcBack } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function ExperienceEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const initial = isNew ? blankExperience() : await findExperience(id);
  if (!initial) notFound();

  return (
    <>
      <div className="adm-crumbs">
        <Link href="/admin/experience"><IcBack /> Pengalaman</Link>
      </div>
      <div className="adm-head">
        <div><h1>{isNew ? "Tambah pengalaman" : "Edit pengalaman"}</h1></div>
      </div>
      <ExperienceForm initial={initial} />
    </>
  );
}
