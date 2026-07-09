import "../admin.css";
import { LoginForm } from "@/app/admin/_components/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" && sp.next.startsWith("/admin") ? sp.next : "/admin";

  return (
    <div className="adm-login">
      <div className="adm-login-card">
        <div className="mark">MED</div>
        <h1>Masuk ke Admin</h1>
        <p className="subtitle">Kelola konten portofolio kamu tanpa menyentuh kode.</p>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
