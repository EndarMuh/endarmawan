import { prisma } from "./prisma";

/* ---------- shared types ---------- */
export type Lang = "en" | "id";
export type L = { en: string; id: string };
export type LList = { en: string[]; id: string[] };

export type Stat = { n: number; dec: number; suf: string; lbl: L };
export type Fact = { k: L; v: L };

export type ProfileData = {
  name: string;
  initials: string;
  photoUrl: string | null;
  cvUrl: string | null;
  email: string;
  phone: string;
  linkedin: string;
  showPhone: boolean;
  roles: LList;
  eyebrow: L;
  intro: L;
  location: L;
  availability: L;
  aboutParas: L[];
  facts: Fact[];
  stats: Stat[];
  contactH: L;
  contactP: L;
  openTo: string[];
};

export type ExperienceData = {
  id: string; org: string; loc: string; current: boolean;
  role: L; type: L; period: L; bullets: LList; tags: string[];
};
export type ProjectData = {
  id: string; name: string; category: string;
  role: L; period: L; desc: L; tags: string[]; imageUrl: string | null; link: string | null;
};
export type SkillGroupData = { id: string; title: L; items: string[] };
export type EducationData = { id: string; school: string; degree: L; period: L; detail: L };
export type OrganizationData = { id: string; org: string; role: L; period: L; bullets: LList };
export type CertificateData = { id: string; name: string; sub: L };

export type ContentData = {
  profile: ProfileData;
  experiences: ExperienceData[];
  projects: ProjectData[];
  skills: SkillGroupData[];
  education: EducationData[];
  organizations: OrganizationData[];
  certificates: CertificateData[];
};

/** parse a JSON-string column */
const P = <T>(s: string): T => JSON.parse(s) as T;

export async function getContent(): Promise<ContentData> {
  const [profile, experiences, projects, skills, education, organizations, certificates] =
    await Promise.all([
      prisma.profile.findFirst(),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.skillGroup.findMany({ orderBy: { order: "asc" } }),
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.organization.findMany({ orderBy: { order: "asc" } }),
      prisma.certificate.findMany({ orderBy: { order: "asc" } }),
    ]);

  if (!profile) throw new Error("No profile found. Run `npm run db:seed`.");

  return {
    profile: {
      name: profile.name,
      initials: profile.initials,
      photoUrl: profile.photoUrl,
      cvUrl: profile.cvUrl,
      email: profile.email,
      phone: profile.phone,
      linkedin: profile.linkedin,
      showPhone: profile.showPhone,
      roles: P<LList>(profile.roles),
      eyebrow: P<L>(profile.eyebrow),
      intro: P<L>(profile.intro),
      location: P<L>(profile.location),
      availability: P<L>(profile.availability),
      aboutParas: P<L[]>(profile.aboutParas),
      facts: P<Fact[]>(profile.facts),
      stats: P<Stat[]>(profile.stats),
      contactH: P<L>(profile.contactH),
      contactP: P<L>(profile.contactP),
      openTo: P<string[]>(profile.openTo),
    },
    experiences: experiences.map((e) => ({
      id: e.id, org: e.org, loc: e.loc, current: e.current,
      role: P<L>(e.role), type: P<L>(e.type), period: P<L>(e.period),
      bullets: P<LList>(e.bullets), tags: P<string[]>(e.tags),
    })),
    projects: projects.map((p) => ({
      id: p.id, name: p.name, category: p.category,
      role: P<L>(p.role), period: P<L>(p.period), desc: P<L>(p.desc),
      tags: P<string[]>(p.tags), imageUrl: p.imageUrl, link: p.link,
    })),
    skills: skills.map((s) => ({ id: s.id, title: P<L>(s.title), items: P<string[]>(s.items) })),
    education: education.map((e) => ({
      id: e.id, school: e.school, degree: P<L>(e.degree), period: P<L>(e.period), detail: P<L>(e.detail),
    })),
    organizations: organizations.map((o) => ({
      id: o.id, org: o.org, role: P<L>(o.role), period: P<L>(o.period), bullets: P<LList>(o.bullets),
    })),
    certificates: certificates.map((c) => ({ id: c.id, name: c.name, sub: P<L>(c.sub) })),
  };
}
