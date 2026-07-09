import "../admin.css";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logout } from "@/app/admin/actions";
import { AdminNav, type NavItem } from "@/app/admin/_components/AdminNav";
import { IcLogout } from "@/app/admin/_components/fields";

// Admin pages must always read fresh data (they depend on the session cookie + DB).
export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  const [experience, projects, skills, education, organizations, certificates] = await Promise.all([
    prisma.experience.count(),
    prisma.project.count(),
    prisma.skillGroup.count(),
    prisma.education.count(),
    prisma.organization.count(),
    prisma.certificate.count(),
  ]);

  const items: NavItem[] = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/profile", label: "Profil" },
    { href: "/admin/experience", label: "Pengalaman", count: experience },
    { href: "/admin/projects", label: "Proyek", count: projects },
    { href: "/admin/skills", label: "Keahlian", count: skills },
    { href: "/admin/education", label: "Pendidikan", count: education },
    { href: "/admin/organizations", label: "Organisasi", count: organizations },
    { href: "/admin/certificates", label: "Sertifikat", count: certificates },
    { href: "/", label: "Lihat situs ↗", external: true },
  ];

  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-brand">
          <span className="mark">MED</span>
          <div>Admin<small>portfolio</small></div>
        </div>
        <AdminNav items={items} />
        <div className="adm-side-foot">
          <span className="who">{session.email}</span>
          <form action={logout}>
            <button type="submit" className="adm-btn adm-btn-sm" style={{ width: "100%", justifyContent: "center" }}>
              <IcLogout /> Keluar
            </button>
          </form>
        </div>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  );
}
