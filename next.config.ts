import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These packages use Node.js built-ins (fs, path) that only work on the server.
  // This tells Next.js to keep them out of the browser bundle.
  serverExternalPackages: ["pdf-parse", "officeparser"],
};

export default nextConfig;
