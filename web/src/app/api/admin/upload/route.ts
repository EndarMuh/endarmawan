import { NextResponse, type NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(request: NextRequest) {
  // Re-check auth here — Route Handlers are reachable directly, not just via the UI.
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: "Storage belum dikonfigurasi (Cloudinary env belum diset)." }, { status: 500 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const kind = String(form.get("kind") ?? "image"); // "image" | "pdf"

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Tidak ada file yang diunggah." }, { status: 400 });
  }

  const isPdf = kind === "pdf";
  const maxBytes = isPdf ? 10 * 1024 * 1024 : 5 * 1024 * 1024;

  if (isPdf) {
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Hanya file PDF yang diperbolehkan." }, { status: 400 });
    }
  } else if (!IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Format gambar tidak didukung (pakai PNG, JPG, WEBP, GIF, atau SVG)." },
      { status: 400 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > maxBytes) {
    return NextResponse.json({ error: `File terlalu besar (maks ${isPdf ? 10 : 5} MB).` }, { status: 400 });
  }

  try {
    const url = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio",
          resource_type: "auto", // handles images and PDFs
          // keep a readable-ish public id but unique
          public_id: `${Date.now()}`,
        },
        (err, result) => {
          if (err || !result) reject(err ?? new Error("Upload gagal."));
          else resolve(result.secure_url);
        },
      );
      stream.end(bytes);
    });

    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gagal mengunggah ke storage." },
      { status: 500 },
    );
  }
}
