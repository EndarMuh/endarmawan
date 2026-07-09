import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [experience, projects, skills, education, organizations, certificates, profile] = await Promise.all([
    prisma.experience.count(),
    prisma.project.count(),
    prisma.skillGroup.count(),
    prisma.education.count(),
    prisma.organization.count(),
    prisma.certificate.count(),
    prisma.profile.findFirst({ select: { name: true, updatedAt: true } }),
  ]);

  const cards = [
    { href: "/admin/profile", k: "Inti", t: "Profil", d: "Hero, about, statistik, fakta, dan kontak.", n: profile ? "1 profil" : "belum diisi" },
    { href: "/admin/experience", k: "Riwayat", t: "Pengalaman", d: "Timeline pekerjaan & magang.", n: `${experience} entri` },
    { href: "/admin/projects", k: "Karya", t: "Proyek", d: "Proyek pilihan dengan filter kategori.", n: `${projects} entri` },
    { href: "/admin/skills", k: "Keahlian", t: "Skill Groups", d: "Kelompok keahlian & perangkat.", n: `${skills} grup` },
    { href: "/admin/education", k: "Studi", t: "Pendidikan", d: "Riwayat pendidikan formal.", n: `${education} entri` },
    { href: "/admin/organizations", k: "Aktivitas", t: "Organisasi", d: "Pengalaman berorganisasi.", n: `${organizations} entri` },
    { href: "/admin/certificates", k: "Kredensial", t: "Sertifikat", d: "Sertifikat & kredensial.", n: `${certificates} entri` },
  ];

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Dashboard</h1>
          <p>Halo{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""} 👋 — pilih bagian untuk mengedit.</p>
        </div>
        <Link href="/" target="_blank" rel="noopener noreferrer" className="adm-btn">Lihat situs ↗</Link>
      </div>

      <div className="adm-grid">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="adm-card">
            <div className="k">{c.k}</div>
            <div className="t">{c.t}</div>
            <div className="d">{c.d}</div>
            <div className="n">{c.n}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
