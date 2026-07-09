import Link from "next/link";
import { notFound } from "next/navigation";
import { findProject } from "@/lib/admin-data";
import { blankProject } from "@/lib/admin-types";
import { ProjectForm } from "@/app/admin/_components/EntityForms";
import { IcBack } from "@/app/admin/_components/fields";

export const dynamic = "force-dynamic";

export default async function ProjectEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const initial = isNew ? blankProject() : await findProject(id);
  if (!initial) notFound();

  return (
    <>
      <div className="adm-crumbs">
        <Link href="/admin/projects"><IcBack /> Proyek</Link>
      </div>
      <div className="adm-head">
        <div><h1>{isNew ? "Tambah proyek" : "Edit proyek"}</h1></div>
      </div>
      <ProjectForm initial={initial} />
    </>
  );
}
