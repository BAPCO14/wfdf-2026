import { NextRequest, NextResponse } from "next/server";
import { inscriptionSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import DOMPurify from "isomorphic-dompurify";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { success } = await checkRateLimit(request);
  if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if ((body as Record<string, unknown>)?.website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = inscriptionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { firstName, lastName, email, phone, tournamentId, license } = parsed.data;
  const safeFirst = DOMPurify.sanitize(firstName);
  const safeLast = DOMPurify.sanitize(lastName);

  try {
    await resend.emails.send({
      from: "WFDF Inscriptions <noreply@frenchdartsfestival.fr>",
      to: process.env.CONTACT_EMAIL ?? "contact@frenchdartsfestival.fr",
      subject: `[WFDF Inscription] ${safeFirst} ${safeLast} — ${tournamentId}`,
      html: `<p><strong>Joueur :</strong> ${safeFirst} ${safeLast}</p><p><strong>Email :</strong> ${email}</p><p><strong>Téléphone :</strong> ${phone}</p><p><strong>Tournoi :</strong> ${tournamentId}</p>${license ? `<p><strong>Licence :</strong> ${DOMPurify.sanitize(license)}</p>` : ""}`,
    });
    await resend.emails.send({
      from: "WFDF 2026 <noreply@frenchdartsfestival.fr>",
      to: email,
      subject: "Confirmation d'inscription — Winamax French Darts Festival 2026",
      html: `<p>Bonjour ${safeFirst},</p><p>Votre inscription au tournoi <strong>${tournamentId}</strong> a bien été reçue. Vous serez contacté(e) pour la confirmation définitive.</p><p>À bientôt au WFDF 2026 !</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
