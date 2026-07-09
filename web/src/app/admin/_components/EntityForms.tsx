"use client";

import { useState } from "react";
import {
  saveProfile, saveExperience, saveProject, saveSkill,
  saveEducation, saveOrganization, saveCertificate,
} from "../actions";
import type {
  ProfileInput, ExperienceInput, ProjectInput, SkillInput,
  EducationInput, OrganizationInput, CertificateInput,
} from "@/lib/admin-types";
import { FormShell } from "./FormShell";
import { Text, Toggle, Bilingual, Lines, BilingualLines, Uploader, FactsEditor, StatsEditor } from "./fields";

/* ============================ PROFILE ============================ */
export function ProfileForm({ initial }: { initial: ProfileInput }) {
  const [d, setD] = useState<ProfileInput>(initial);
  const up = <K extends keyof ProfileInput>(k: K, v: ProfileInput[K]) => setD((p) => ({ ...p, [k]: v }));

  return (
    <FormShell onSave={() => saveProfile(d)} backHref="/admin/profile" stay>
      <fieldset className="adm-fieldset">
        <div className="adm-legend">Identitas & Hero</div>
        <Text label="Nama" value={d.name} onChange={(v) => up("name", v)} />
        <Text label="Inisial" value={d.initials} onChange={(v) => up("initials", v)} hint="mis. MED" />
        <Bilingual label="Eyebrow" value={d.eyebrow} onChange={(v) => up("eyebrow", v)} hint="teks kecil di atas nama" />
        <Bilingual label="Intro" value={d.intro} onChange={(v) => up("intro", v)} textarea />
        <BilingualLines label="Roles (kata berputar)" value={d.roles} onChange={(v) => up("roles", v)} />
        <Bilingual label="Lokasi" value={d.location} onChange={(v) => up("location", v)} />
        <Bilingual label="Availability" value={d.availability} onChange={(v) => up("availability", v)} />
        <Uploader label="Foto profil" value={d.photoUrl} onChange={(v) => up("photoUrl", v)} kind="image" />
        <Uploader label="CV — English (PDF)" value={d.cvUrl} onChange={(v) => up("cvUrl", v)} kind="pdf"
          hint="diunduh saat situs bahasa Inggris" />
        <Uploader label="CV — Indonesia (PDF)" value={d.cvUrlId} onChange={(v) => up("cvUrlId", v)} kind="pdf"
          hint="diunduh saat situs bahasa Indonesia (kalau kosong, pakai CV English)" />
      </fieldset>

      <fieldset className="adm-fieldset">
        <div className="adm-legend">About</div>
        {d.aboutParas.map((p, i) => (
          <Bilingual key={i} label={`Paragraf ${i + 1}`} value={p} textarea
            onChange={(v) => up("aboutParas", d.aboutParas.map((x, j) => (j === i ? v : x)))} />
        ))}
        <div className="adm-actions">
          <button type="button" className="adm-btn adm-btn-sm"
            onClick={() => up("aboutParas", [...d.aboutParas, { en: "", id: "" }])}>+ Paragraf</button>
          {d.aboutParas.length > 1 && (
            <button type="button" className="adm-btn adm-btn-sm adm-btn-danger"
              onClick={() => up("aboutParas", d.aboutParas.slice(0, -1))}>− Paragraf terakhir</button>
          )}
        </div>
        <div style={{ height: 16 }} />
        <FactsEditor value={d.facts} onChange={(v) => up("facts", v)} />
      </fieldset>

      <fieldset className="adm-fieldset">
        <div className="adm-legend">Statistik</div>
        <StatsEditor value={d.stats} onChange={(v) => up("stats", v)} />
      </fieldset>

      <fieldset className="adm-fieldset">
        <div className="adm-legend">Kontak</div>
        <Text label="Email" value={d.email} onChange={(v) => up("email", v)} type="email" />
        <Text label="LinkedIn" value={d.linkedin} onChange={(v) => up("linkedin", v)} hint="tanpa https:// — mis. www.linkedin.com/in/nama" />
        <Text label="GitHub" value={d.github ?? ""} onChange={(v) => up("github", v || null)} hint="tanpa https:// — mis. github.com/EndarMuh" />
        <Text label="GitLab" value={d.gitlab ?? ""} onChange={(v) => up("gitlab", v || null)} hint="tanpa https:// — mis. gitlab.com/EndarMuh" />
        <Text label="Telepon" value={d.phone} onChange={(v) => up("phone", v)} hint="hanya tampil jika toggle di bawah aktif" />
        <Toggle label="Tampilkan nomor telepon di situs publik" value={d.showPhone} onChange={(v) => up("showPhone", v)} />
        <Bilingual label="Judul kontak" value={d.contactH} onChange={(v) => up("contactH", v)} />
        <Bilingual label="Paragraf kontak" value={d.contactP} onChange={(v) => up("contactP", v)} textarea />
        <Lines label="Open to roles" value={d.openTo} onChange={(v) => up("openTo", v)} />
      </fieldset>
    </FormShell>
  );
}

/* ============================ EXPERIENCE ============================ */
export function ExperienceForm({ initial }: { initial: ExperienceInput }) {
  const [d, setD] = useState<ExperienceInput>(initial);
  const up = <K extends keyof ExperienceInput>(k: K, v: ExperienceInput[K]) => setD((p) => ({ ...p, [k]: v }));
  return (
    <FormShell onSave={() => saveExperience(d)} backHref="/admin/experience">
      <fieldset className="adm-fieldset">
        <Text label="Organisasi / Perusahaan" value={d.org} onChange={(v) => up("org", v)} />
        <Text label="Lokasi" value={d.loc} onChange={(v) => up("loc", v)} />
        <Bilingual label="Peran" value={d.role} onChange={(v) => up("role", v)} />
        <Bilingual label="Tipe" value={d.type} onChange={(v) => up("type", v)} hint="mis. Full-time / Internship" />
        <Bilingual label="Periode" value={d.period} onChange={(v) => up("period", v)} hint="mis. Apr 2025 – Present" />
        <Toggle label="Posisi saat ini (badge 'Current')" value={d.current} onChange={(v) => up("current", v)} />
        <BilingualLines label="Poin pekerjaan" value={d.bullets} onChange={(v) => up("bullets", v)} />
        <Lines label="Tags" value={d.tags} onChange={(v) => up("tags", v)} />
      </fieldset>
    </FormShell>
  );
}

/* ============================ PROJECT ============================ */
export function ProjectForm({ initial }: { initial: ProjectInput }) {
  const [d, setD] = useState<ProjectInput>(initial);
  const up = <K extends keyof ProjectInput>(k: K, v: ProjectInput[K]) => setD((p) => ({ ...p, [k]: v }));
  return (
    <FormShell onSave={() => saveProject(d)} backHref="/admin/projects">
      <fieldset className="adm-fieldset">
        <Text label="Nama proyek" value={d.name} onChange={(v) => up("name", v)} />
        <div className="adm-field">
          <label className="adm-label">Kategori <span className="hint">memengaruhi filter di situs</span></label>
          <select className="adm-select" value={d.category} onChange={(e) => up("category", e.target.value)}>
            <option value="web">Web</option>
            <option value="mobile">Mobile &amp; ML</option>
            <option value="data">Data</option>
          </select>
        </div>
        <Bilingual label="Peran" value={d.role} onChange={(v) => up("role", v)} />
        <Bilingual label="Periode" value={d.period} onChange={(v) => up("period", v)} />
        <Bilingual label="Deskripsi" value={d.desc} onChange={(v) => up("desc", v)} textarea />
        <Lines label="Tags" value={d.tags} onChange={(v) => up("tags", v)} />
        <Text label="Link (opsional)" value={d.link ?? ""} onChange={(v) => up("link", v || null)} hint="URL demo/repo" />
        <Uploader label="Gambar (opsional)" value={d.imageUrl} onChange={(v) => up("imageUrl", v)} kind="image" />
      </fieldset>
    </FormShell>
  );
}

/* ============================ SKILL GROUP ============================ */
export function SkillForm({ initial }: { initial: SkillInput }) {
  const [d, setD] = useState<SkillInput>(initial);
  const up = <K extends keyof SkillInput>(k: K, v: SkillInput[K]) => setD((p) => ({ ...p, [k]: v }));
  return (
    <FormShell onSave={() => saveSkill(d)} backHref="/admin/skills">
      <fieldset className="adm-fieldset">
        <Bilingual label="Judul grup" value={d.title} onChange={(v) => up("title", v)} />
        <Lines label="Item keahlian" value={d.items} onChange={(v) => up("items", v)} />
      </fieldset>
    </FormShell>
  );
}

/* ============================ EDUCATION ============================ */
export function EducationForm({ initial }: { initial: EducationInput }) {
  const [d, setD] = useState<EducationInput>(initial);
  const up = <K extends keyof EducationInput>(k: K, v: EducationInput[K]) => setD((p) => ({ ...p, [k]: v }));
  return (
    <FormShell onSave={() => saveEducation(d)} backHref="/admin/education">
      <fieldset className="adm-fieldset">
        <Text label="Sekolah / Kampus" value={d.school} onChange={(v) => up("school", v)} />
        <Bilingual label="Gelar / Jurusan" value={d.degree} onChange={(v) => up("degree", v)} />
        <Bilingual label="Periode" value={d.period} onChange={(v) => up("period", v)} />
        <Bilingual label="Detail" value={d.detail} onChange={(v) => up("detail", v)} textarea />
      </fieldset>
    </FormShell>
  );
}

/* ============================ ORGANIZATION ============================ */
export function OrganizationForm({ initial }: { initial: OrganizationInput }) {
  const [d, setD] = useState<OrganizationInput>(initial);
  const up = <K extends keyof OrganizationInput>(k: K, v: OrganizationInput[K]) => setD((p) => ({ ...p, [k]: v }));
  return (
    <FormShell onSave={() => saveOrganization(d)} backHref="/admin/organizations">
      <fieldset className="adm-fieldset">
        <Text label="Organisasi" value={d.org} onChange={(v) => up("org", v)} />
        <Bilingual label="Peran" value={d.role} onChange={(v) => up("role", v)} />
        <Bilingual label="Periode" value={d.period} onChange={(v) => up("period", v)} />
        <BilingualLines label="Poin kegiatan" value={d.bullets} onChange={(v) => up("bullets", v)} />
      </fieldset>
    </FormShell>
  );
}

/* ============================ CERTIFICATE ============================ */
export function CertificateForm({ initial }: { initial: CertificateInput }) {
  const [d, setD] = useState<CertificateInput>(initial);
  const up = <K extends keyof CertificateInput>(k: K, v: CertificateInput[K]) => setD((p) => ({ ...p, [k]: v }));
  return (
    <FormShell onSave={() => saveCertificate(d)} backHref="/admin/certificates">
      <fieldset className="adm-fieldset">
        <Text label="Nama sertifikat" value={d.name} onChange={(v) => up("name", v)} />
        <Bilingual label="Subjudul" value={d.sub} onChange={(v) => up("sub", v)} hint="mis. penerbit / keterangan" />
        <Uploader label="File sertifikat (gambar)" value={d.fileUrl} onChange={(v) => up("fileUrl", v)} kind="image"
          hint="tampil sebagai preview di situs; diklik → sertifikat penuh" />
      </fieldset>
    </FormShell>
  );
}
