"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession, createSessionCookie, clearSessionCookie } from "@/lib/auth";
import type {
  ProfileInput,
  ExperienceInput,
  ProjectInput,
  SkillInput,
  EducationInput,
  OrganizationInput,
  CertificateInput,
  LoginState,
} from "@/lib/admin-types";

/** Serialize a bilingual object / array into a JSON string column. */
const J = (v: unknown) => JSON.stringify(v);

/** Re-render the public site and the given admin list after a mutation. */
function bust(adminPath?: string) {
  revalidatePath("/");
  if (adminPath) revalidatePath(adminPath);
}

/* ============================ AUTH ============================ */

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "") || "/admin";

  if (!email || !password) return { error: "Email dan password wajib diisi." };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { error: "Email atau password salah." };
  }

  await createSessionCookie({ sub: user.id, email: user.email });
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}

/* ============================ PROFILE ============================ */

export async function saveProfile(data: ProfileInput): Promise<void> {
  await requireSession();
  const payload = {
    name: data.name.trim(),
    initials: data.initials.trim() || "MED",
    photoUrl: data.photoUrl || null,
    cvUrl: data.cvUrl || null,
    cvUrlId: data.cvUrlId || null,
    email: data.email.trim(),
    phone: data.phone.trim(),
    linkedin: data.linkedin.trim(),
    github: data.github?.trim() || null,
    gitlab: data.gitlab?.trim() || null,
    showPhone: data.showPhone,
    roles: J(data.roles),
    eyebrow: J(data.eyebrow),
    intro: J(data.intro),
    location: J(data.location),
    availability: J(data.availability),
    aboutParas: J(data.aboutParas),
    facts: J(data.facts),
    stats: J(data.stats),
    contactH: J(data.contactH),
    contactP: J(data.contactP),
    openTo: J(data.openTo),
  };

  const existing = await prisma.profile.findFirst({ select: { id: true } });
  if (existing) await prisma.profile.update({ where: { id: existing.id }, data: payload });
  else await prisma.profile.create({ data: payload });

  bust("/admin/profile");
}

/* ======================= COLLECTIONS: helpers ======================= */

// A minimal view over the Prisma model delegates so reorder/delete can be generic.
type AnyDelegate = {
  findMany: (args: unknown) => Promise<Array<{ id: string; order: number }>>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
};

const MODELS: Record<string, AnyDelegate> = {
  experience: prisma.experience as unknown as AnyDelegate,
  projects: prisma.project as unknown as AnyDelegate,
  skills: prisma.skillGroup as unknown as AnyDelegate,
  education: prisma.education as unknown as AnyDelegate,
  organizations: prisma.organization as unknown as AnyDelegate,
  certificates: prisma.certificate as unknown as AnyDelegate,
};

async function nextOrder(model: AnyDelegate): Promise<number> {
  const rows = await model.findMany({ orderBy: { order: "desc" }, take: 1, select: { order: true } });
  return rows.length ? rows[0].order + 1 : 0;
}

/** Move a row up/down within its collection; re-normalizes orders to 0..n-1. */
export async function moveItem(formData: FormData): Promise<void> {
  await requireSession();
  const type = String(formData.get("type") ?? "");
  const id = String(formData.get("id") ?? "");
  const dir = String(formData.get("dir") ?? "");
  const model = MODELS[type];
  if (!model) throw new Error(`Unknown collection: ${type}`);

  const rows = await model.findMany({ orderBy: { order: "asc" }, select: { id: true, order: true } });
  const idx = rows.findIndex((r) => r.id === id);
  if (idx < 0) return;
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= rows.length) return;

  const ids = rows.map((r) => r.id);
  [ids[idx], ids[swap]] = [ids[swap], ids[idx]];
  await prisma.$transaction(
    ids.map((rid, i) => model.update({ where: { id: rid }, data: { order: i } })) as never,
  );
  bust(`/admin/${type}`);
}

/** Delete a row from its collection. */
export async function deleteItem(formData: FormData): Promise<void> {
  await requireSession();
  const type = String(formData.get("type") ?? "");
  const id = String(formData.get("id") ?? "");
  const model = MODELS[type];
  if (!model) throw new Error(`Unknown collection: ${type}`);
  await model.delete({ where: { id } });
  bust(`/admin/${type}`);
}

/* ======================= COLLECTIONS: save ======================= */

export async function saveExperience(data: ExperienceInput): Promise<void> {
  await requireSession();
  const payload = {
    org: data.org.trim(),
    loc: data.loc.trim(),
    current: data.current,
    role: J(data.role),
    type: J(data.type),
    period: J(data.period),
    bullets: J(data.bullets),
    tags: J(data.tags),
  };
  if (data.id) await prisma.experience.update({ where: { id: data.id }, data: payload });
  else await prisma.experience.create({ data: { ...payload, order: await nextOrder(MODELS.experience) } });
  bust("/admin/experience");
}

export async function saveProject(data: ProjectInput): Promise<void> {
  await requireSession();
  const payload = {
    name: data.name.trim(),
    category: data.category,
    role: J(data.role),
    period: J(data.period),
    desc: J(data.desc),
    tags: J(data.tags),
    imageUrl: data.imageUrl || null,
    link: data.link || null,
  };
  if (data.id) await prisma.project.update({ where: { id: data.id }, data: payload });
  else await prisma.project.create({ data: { ...payload, order: await nextOrder(MODELS.projects) } });
  bust("/admin/projects");
}

export async function saveSkill(data: SkillInput): Promise<void> {
  await requireSession();
  const payload = { title: J(data.title), items: J(data.items) };
  if (data.id) await prisma.skillGroup.update({ where: { id: data.id }, data: payload });
  else await prisma.skillGroup.create({ data: { ...payload, order: await nextOrder(MODELS.skills) } });
  bust("/admin/skills");
}

export async function saveEducation(data: EducationInput): Promise<void> {
  await requireSession();
  const payload = {
    school: data.school.trim(),
    degree: J(data.degree),
    period: J(data.period),
    detail: J(data.detail),
  };
  if (data.id) await prisma.education.update({ where: { id: data.id }, data: payload });
  else await prisma.education.create({ data: { ...payload, order: await nextOrder(MODELS.education) } });
  bust("/admin/education");
}

export async function saveOrganization(data: OrganizationInput): Promise<void> {
  await requireSession();
  const payload = {
    org: data.org.trim(),
    role: J(data.role),
    period: J(data.period),
    bullets: J(data.bullets),
  };
  if (data.id) await prisma.organization.update({ where: { id: data.id }, data: payload });
  else await prisma.organization.create({ data: { ...payload, order: await nextOrder(MODELS.organizations) } });
  bust("/admin/organizations");
}

export async function saveCertificate(data: CertificateInput): Promise<void> {
  await requireSession();
  const payload = { name: data.name.trim(), sub: J(data.sub), fileUrl: data.fileUrl || null };
  if (data.id) await prisma.certificate.update({ where: { id: data.id }, data: payload });
  else await prisma.certificate.create({ data: { ...payload, order: await nextOrder(MODELS.certificates) } });
  bust("/admin/certificates");
}
