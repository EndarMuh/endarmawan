// Input shapes for the admin editors. These mirror the parsed content types but add
// an optional `id` (present when editing, absent when creating).
import type { L, LList, Fact, Stat } from "./content";

/** Return value of the `login` server action (used with useActionState). */
export type LoginState = { error?: string };

export type ProfileInput = {
  name: string;
  initials: string;
  photoUrl: string | null;
  cvUrl: string | null;
  cvUrlId: string | null;
  email: string;
  phone: string;
  linkedin: string;
  github: string | null;
  gitlab: string | null;
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

export type ExperienceInput = {
  id?: string;
  org: string;
  loc: string;
  current: boolean;
  role: L;
  type: L;
  period: L;
  bullets: LList;
  tags: string[];
};

export type ProjectInput = {
  id?: string;
  name: string;
  category: string;
  role: L;
  period: L;
  desc: L;
  tags: string[];
  imageUrl: string | null;
  link: string | null;
};

export type SkillInput = {
  id?: string;
  title: L;
  items: string[];
};

export type EducationInput = {
  id?: string;
  school: string;
  degree: L;
  period: L;
  detail: L;
};

export type OrganizationInput = {
  id?: string;
  org: string;
  role: L;
  period: L;
  bullets: LList;
};

export type CertificateInput = {
  id?: string;
  name: string;
  sub: L;
  fileUrl: string | null;
};

/* ---- blank factories (fresh object per call → safe as form initial state) ---- */
const L0 = (): L => ({ en: "", id: "" });
const LL0 = (): LList => ({ en: [], id: [] });

export const blankProfile = (): ProfileInput => ({
  name: "", initials: "MED", photoUrl: null, cvUrl: null, cvUrlId: null, email: "", phone: "", linkedin: "",
  github: null, gitlab: null,
  showPhone: false, roles: LL0(), eyebrow: L0(), intro: L0(), location: L0(), availability: L0(),
  aboutParas: [L0()], facts: [], stats: [], contactH: L0(), contactP: L0(), openTo: [],
});
export const blankExperience = (): ExperienceInput => ({
  org: "", loc: "", current: false, role: L0(), type: L0(), period: L0(), bullets: LL0(), tags: [],
});
export const blankProject = (): ProjectInput => ({
  name: "", category: "web", role: L0(), period: L0(), desc: L0(), tags: [], imageUrl: null, link: null,
});
export const blankSkill = (): SkillInput => ({ title: L0(), items: [] });
export const blankEducation = (): EducationInput => ({ school: "", degree: L0(), period: L0(), detail: L0() });
export const blankOrganization = (): OrganizationInput => ({ org: "", role: L0(), period: L0(), bullets: LL0() });
export const blankCertificate = (): CertificateInput => ({ name: "", sub: L0(), fileUrl: null });

/** Collection route segments — used for reorder/delete dispatch and nav. */
export const COLLECTIONS = [
  "experience",
  "projects",
  "skills",
  "education",
  "organizations",
  "certificates",
] as const;
export type Collection = (typeof COLLECTIONS)[number];
