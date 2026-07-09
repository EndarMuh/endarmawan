import { loadProfile } from "@/lib/admin-data";
import { ProfileForm } from "@/app/admin/_components/EntityForms";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const profile = await loadProfile();
  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Profil</h1>
          <p>Konten inti: hero, about, statistik, fakta, dan kontak.</p>
        </div>
      </div>
      <ProfileForm initial={profile} />
    </>
  );
}
