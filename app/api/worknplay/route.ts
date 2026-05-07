import { NextRequest, NextResponse } from "next/server";
import { worknplaySchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import DOMPurify from "isomorphic-dompurify";
import { Resend } from "resend";

async function verifyTurnstile(token: string): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY ?? "")}&response=${encodeURIComponent(token)}`,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

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

  const parsed = worknplaySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { company, contactName, email, phone, participants, message, turnstileToken } = parsed.data;

  const turnstileOk = await verifyTurnstile(turnstileToken);
  if (!turnstileOk) return NextResponse.json({ error: "Verification failed" }, { status: 403 });

  const safeCompany = DOMPurify.sanitize(company);
  const safeName = DOMPurify.sanitize(contactName);
  const safeMessage = message ? DOMPurify.sanitize(message) : "";

  try {
    await resend.emails.send({
      from: "WFDF Work'N'Play <noreply@frenchdartsfestival.fr>",
      to: process.env.CONTACT_EMAIL ?? "contact@frenchdartsfestival.fr",
      subject: `[Work'N'Play] ${safeCompany} — ${participants} participants`,
      html: `<p><strong>Entreprise :</strong> ${safeCompany}</p><p><strong>Contact :</strong> ${safeName}</p><p><strong>Email :</strong> ${email}</p><p><strong>Téléphone :</strong> ${phone}</p><p><strong>Participants :</strong> ${participants}</p>${safeMessage ? `<p><strong>Message :</strong> ${safeMessage}</p>` : ""}`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
