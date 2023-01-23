import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

export default function middleware(req: Request, event: NextFetchEvent): NextResponse {
  const url = new URL(req.url);

  /**
   * Divide time into 1 hour buckets
   */
  const bucket = new Date().setHours(0, 0, 0, 0).toString();

  /**
   *  Increment the pageview counter for this URL but outside of the critical path
   * so that it doesn't block the response.
   */
  event.waitUntil(redis.zincrby(["pageviews", bucket].join(":"), 1, url.pathname));

  return NextResponse.next();
}
