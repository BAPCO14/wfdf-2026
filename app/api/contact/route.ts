import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import DOMPurify from "isomorphic-dompurify";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { success } = await checkRateLimit(request);
  if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if ((body as Record<string, unknown>)?.website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { name, email, subject, message } = parsed.data;
  const safeName = DOMPurify.sanitize(name);
  const safeSubject = DOMPurify.sanitize(subject);
  const safeMessage = DOMPurify.sanitize(message);

  try {
    await resend.emails.send({
      from: "WFDF Contact <noreply@frenchdartsfestival.fr>",
      to: process.env.CONTACT_EMAIL ?? "contact@frenchdartsfestival.fr",
      reply_to: email,
      subject: `[WFDF Contact] ${safeSubject}`,
      html: `<p><strong>De :</strong> ${safeName} (${email})</p><p><strong>Sujet :</strong> ${safeSubject}</p><p><strong>Message :</strong></p><p>${safeMessage.replace(/\n/g, "<br>")}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
