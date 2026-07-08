import type { L } from "./content";

/** UI chrome strings (not editable from the admin — they are part of the shell). */
export const UI = {
  nav: {
    about: { en: "About", id: "Tentang" },
    experience: { en: "Experience", id: "Pengalaman" },
    projects: { en: "Projects", id: "Proyek" },
    skills: { en: "Skills", id: "Keahlian" },
    education: { en: "Education", id: "Pendidikan" },
    contact: { en: "Contact", id: "Kontak" },
  },
  sec: {
    about: { en: "About", id: "Tentang" },
    experience: { en: "Experience", id: "Pengalaman" },
    projects: { en: "Selected Projects", id: "Proyek Pilihan" },
    skills: { en: "Skills & Tools", id: "Keahlian & Perangkat" },
    education: { en: "Education & Organization", id: "Pendidikan & Organisasi" },
    contact: { en: "Contact", id: "Kontak" },
  },
  cta: {
    work: { en: "View work", id: "Lihat karya" },
    cv: { en: "Download CV", id: "Unduh CV" },
    contact: { en: "Get in touch", id: "Hubungi saya" },
  },
  filterAll: { en: "All", id: "Semua" },
  filters: { web: { en: "Web", id: "Web" }, mobile: { en: "Mobile & ML", id: "Mobile & ML" } },
  copy: { en: "Copy email", id: "Salin email" },
  copied: { en: "Email copied!", id: "Email tersalin!" },
  current: { en: "Current", id: "Saat ini" },
  eduCol: { en: "Education", id: "Pendidikan" },
  orgCol: { en: "Organization", id: "Organisasi" },
  certCol: { en: "Certificates", id: "Sertifikat" },
  openTo: { en: "Open to roles", id: "Terbuka untuk peran" },
  foot: { en: "// designed & built as a living portfolio", id: "// dirancang & dibangun sebagai portofolio hidup" },
  totop: { en: "Back to top", id: "Ke atas" },
} satisfies Record<string, L | Record<string, L>>;
