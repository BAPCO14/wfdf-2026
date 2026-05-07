import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: false,
});

export async function checkRateLimit(request: NextRequest): Promise<{ success: boolean; reset: number }> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
  const { success, reset } = await ratelimit.limit(ip);
  return { success, reset };
}
