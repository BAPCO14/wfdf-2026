import { NextRequest, NextResponse } from "next/server";

const BLOCKED_USER_AGENTS = [
  "sqlmap", "nikto", "masscan", "zgrab", "dirbuster", "nuclei",
  "nmap", "acunetix", "nessus", "openvas", "burpsuite", "hydra",
  "gobuster", "wfuzz", "dirb", "metasploit",
];

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://frenchdartsfestival.fr",
  "http://localhost:3000",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const ua = request.headers.get("user-agent")?.toLowerCase() ?? "";

  // Block malicious user-agents
  if (BLOCKED_USER_AGENTS.some((bot) => ua.includes(bot))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // CSRF check for mutating API routes
  if (pathname.startsWith("/api/") && ["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
    const origin = request.headers.get("origin");
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  const response = NextResponse.next();

  // Security headers (belt-and-suspenders on top of next.config.ts)
  response.headers.set("X-Request-ID", crypto.randomUUID());

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
