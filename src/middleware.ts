import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  // ✅ Just ensure user is authenticated (optional)
  await auth(); // No need to call protect or check role
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Apply to all routes except static/_next
    '/(api|trpc)(.*)',
  ],
};
