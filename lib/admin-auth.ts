/**
 * Admin authentication guard.
 *
 * ISSUE-04 fix: All write/delete API routes (events, team, sponsors, site-config, upload)
 * were completely unauthenticated. This module provides a simple Bearer-token check
 * that must be called at the top of every protected route handler.
 *
 * The token is compared against the ADMIN_PASSWORD environment variable.
 * Set this to a long, random string (e.g. `openssl rand -base64 32`).
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * Returns true when the request carries a valid admin Bearer token.
 * Returns false (or throws) if ADMIN_PASSWORD is not configured.
 */
export function isAdminAuthenticated(request: NextRequest | Request): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    // If the env variable is missing we fail closed — deny all requests.
    // This prevents accidental open access when the env is not configured.
    return false;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.slice("Bearer ".length);

  // Constant-time comparison to prevent timing attacks
  if (token.length !== adminPassword.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ adminPassword.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Convenience helper that returns a ready-made 401 response if auth fails.
 * Use at the top of any protected route handler:
 *
 *   const deny = requireAdminAuth(request);
 *   if (deny) return deny;
 */
export function requireAdminAuth(request: NextRequest | Request): NextResponse | null {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      {
        status: 401,
        headers: { "WWW-Authenticate": 'Bearer realm="Admin API"' },
      }
    );
  }
  return null;
}
