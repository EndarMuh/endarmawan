import { getContent } from "@/lib/content";
import Portfolio from "@/components/Portfolio";

// Always read fresh from the DB so edits made in the admin panel show up immediately.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return <Portfolio content={content} />;
}
