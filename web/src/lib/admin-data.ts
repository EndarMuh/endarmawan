// Server-side loaders for the admin editors: fetch a row (or list) and parse the
// JSON-string columns into the typed *Input shapes the forms expect.
import { prisma } from "./prisma";
import { blankProfile } from "./admin-types";
import type {
  ProfileInput, ExperienceInput, ProjectInput, SkillInput,
  EducationInput, OrganizationInput, CertificateInput,
} from "./admin-types";

const P = <T>(s: string): T => JSON.parse(s) as T;

/* ---------------- profile ---------------- */
export async function loadProfile(): Promise<ProfileInput> {
  const p = await prisma.profile.findFirst();
  if (!p) return blankProfile();
  return {
    name: p.name,
    initials: p.initials,
    photoUrl: p.photoUrl,
    cvUrl: p.cvUrl,
    cvUrlId: p.cvUrlId,
    email: p.email,
    phone: p.phone,
    linkedin: p.linkedin,
    github: p.github,
    gitlab: p.gitlab,
    showPhone: p.showPhone,
    roles: P(p.roles),
    eyebrow: P(p.eyebrow),
    intro: P(p.intro),
    location: P(p.location),
    availability: P(p.availability),
    aboutParas: P(p.aboutParas),
    facts: P(p.facts),
    stats: P(p.stats),
    contactH: P(p.contactH),
    contactP: P(p.contactP),
    openTo: P(p.openTo),
  };
}

/* ---------------- experience ---------------- */
type WithId<T> = T & { id: string };

export async function loadExperiences(): Promise<WithId<ExperienceInput>[]> {
  const rows = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return rows.map((e) => ({
    id: e.id, org: e.org, loc: e.loc, current: e.current,
    role: P(e.role), type: P(e.type), period: P(e.period), bullets: P(e.bullets), tags: P(e.tags),
  }));
}
export async function findExperience(id: string): Promise<WithId<ExperienceInput> | null> {
  const e = await prisma.experience.findUnique({ where: { id } });
  if (!e) return null;
  return {
    id: e.id, org: e.org, loc: e.loc, current: e.current,
    role: P(e.role), type: P(e.type), period: P(e.period), bullets: P(e.bullets), tags: P(e.tags),
  };
}

/* ---------------- project ---------------- */
export async function loadProjects(): Promise<WithId<ProjectInput>[]> {
  const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return rows.map((p) => ({
    id: p.id, name: p.name, category: p.category,
    role: P(p.role), period: P(p.period), desc: P(p.desc), tags: P(p.tags),
    imageUrl: p.imageUrl, link: p.link,
  }));
}
export async function findProject(id: string): Promise<WithId<ProjectInput> | null> {
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) return null;
  return {
    id: p.id, name: p.name, category: p.category,
    role: P(p.role), period: P(p.period), desc: P(p.desc), tags: P(p.tags),
    imageUrl: p.imageUrl, link: p.link,
  };
}

/* ---------------- skill ---------------- */
export async function loadSkills(): Promise<WithId<SkillInput>[]> {
  const rows = await prisma.skillGroup.findMany({ orderBy: { order: "asc" } });
  return rows.map((s) => ({ id: s.id, title: P(s.title), items: P(s.items) }));
}
export async function findSkill(id: string): Promise<WithId<SkillInput> | null> {
  const s = await prisma.skillGroup.findUnique({ where: { id } });
  if (!s) return null;
  return { id: s.id, title: P(s.title), items: P(s.items) };
}

/* ---------------- education ---------------- */
export async function loadEducations(): Promise<WithId<EducationInput>[]> {
  const rows = await prisma.education.findMany({ orderBy: { order: "asc" } });
  return rows.map((e) => ({ id: e.id, school: e.school, degree: P(e.degree), period: P(e.period), detail: P(e.detail) }));
}
export async function findEducation(id: string): Promise<WithId<EducationInput> | null> {
  const e = await prisma.education.findUnique({ where: { id } });
  if (!e) return null;
  return { id: e.id, school: e.school, degree: P(e.degree), period: P(e.period), detail: P(e.detail) };
}

/* ---------------- organization ---------------- */
export async function loadOrganizations(): Promise<WithId<OrganizationInput>[]> {
  const rows = await prisma.organization.findMany({ orderBy: { order: "asc" } });
  return rows.map((o) => ({ id: o.id, org: o.org, role: P(o.role), period: P(o.period), bullets: P(o.bullets) }));
}
export async function findOrganization(id: string): Promise<WithId<OrganizationInput> | null> {
  const o = await prisma.organization.findUnique({ where: { id } });
  if (!o) return null;
  return { id: o.id, org: o.org, role: P(o.role), period: P(o.period), bullets: P(o.bullets) };
}

/* ---------------- certificate ---------------- */
export async function loadCertificates(): Promise<WithId<CertificateInput>[]> {
  const rows = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
  return rows.map((c) => ({ id: c.id, name: c.name, sub: P(c.sub), fileUrl: c.fileUrl }));
}
export async function findCertificate(id: string): Promise<WithId<CertificateInput> | null> {
  const c = await prisma.certificate.findUnique({ where: { id } });
  if (!c) return null;
  return { id: c.id, name: c.name, sub: P(c.sub), fileUrl: c.fileUrl };
}
