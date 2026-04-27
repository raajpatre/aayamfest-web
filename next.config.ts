import type { NextConfig } from "next";

// Security headers applied to every response.
// ISSUE-10 fix: Add CSP, X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
const securityHeaders = [
  // Prevent clickjacking — disallow embedding in iframes from other origins
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Prevent MIME-type sniffing attacks
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Control referrer information sent with requests
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disable sensitive browser features not needed by this site
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Force HTTPS for 2 years, including subdomains
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy — restrict resource origins
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js needs 'unsafe-inline' for its inline scripts; GA/GTM also need their CDN
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      // Inline styles are used heavily by Tailwind/framer-motion
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Images from self, data URIs (Next.js), blob (Three.js), and allowed CDNs
      "img-src 'self' data: blob: https://res.cloudinary.com https://firebasestorage.googleapis.com https://aayamfest.com",
      // Fonts from Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // XHR/fetch allowed to Google services and our own origin
      "connect-src 'self' https://*.googleapis.com https://www.google-analytics.com https://www.googletagmanager.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com",
      // Workers for Three.js / WebGL
      "worker-src 'self' blob:",
      // Deny all frame embedding from external origins
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Apply security headers to every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    // ISSUE-09 fix: Replace wildcard (SSRF/open-proxy risk) with an explicit allowlist.
    // Only add hostnames you actually serve images from.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "aayamfest.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile pictures
      },
    ],
  },
};

export default nextConfig;
