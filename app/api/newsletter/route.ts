import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import DOMPurify from "isomorphic-dompurify";

export async function POST(request: NextRequest) {
  // Rate limiting
  const { success, reset } = await checkRateLimit(request);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, {
      status: 429,
      headers: { "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)) },
    });
  }

  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot
  if ((body as Record<string, unknown>)?.website) {
    return NextResponse.json({ ok: true }); // Silent fail
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const email = DOMPurify.sanitize(parsed.data.email);

  try {
    // Brevo double opt-in
    const res = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY ?? "",
      },
      body: JSON.stringify({
        email,
        includeListIds: [Number(process.env.BREVO_LIST_ID ?? 0)],
        redirectionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter-confirmed`,
        templateId: 1,
      }),
    });

    if (!res.ok && res.status !== 204) {
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
