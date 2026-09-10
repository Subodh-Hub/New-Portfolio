export const siteConfig = {
  name: "Subodh Rijal",
  title: "Subodh Rijal | MERN Developer",
  description:
    "MERN Developer portfolio — architecting robust, scalable, and user-centric web applications.",
  jobTitle: "MERN Developer",
  locale: "en_US",
} as const;

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
