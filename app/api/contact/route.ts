import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body permintaan tidak valid." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data tidak valid.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Resend belum dikonfigurasi — beri tahu klien agar memakai fallback mailto:
    return NextResponse.json({ fallback: true }, { status: 200 });
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Portofolio <onboarding@resend.dev>",
    to: siteConfig.email,
    replyTo: email,
    subject: `Pesan portofolio dari ${name}`,
    text: `Nama: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json(
      { error: "Gagal mengirim email. Coba lagi nanti." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
