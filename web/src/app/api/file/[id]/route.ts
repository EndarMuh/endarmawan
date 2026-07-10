import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// Serves a DB-stored file (e.g. a CV PDF) by id. Public — CVs are meant to be downloadable.
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const blob = await prisma.fileBlob.findUnique({ where: { id } });
  if (!blob) return new Response("Not found", { status: 404 });

  const bytes = Buffer.from(blob.data, "base64");
  return new Response(bytes, {
    headers: {
      "Content-Type": blob.mime,
      "Content-Disposition": 'inline; filename="CV.pdf"',
      "Cache-Control": "public, max-age=3600",
      "Content-Length": String(bytes.length),
    },
  });
}
