export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills", count: "16" },
  { label: "Service", href: "#services", count: "4" },
  { label: "Experience", href: "#experience", count: "4" },
  { label: "Project", href: "#projects", count: "5" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  {
    label: "Github",
    href: "https://github.com/Subodh-Hub",
    icon: "github" as const,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/subodh-rijal-aa911a289/",
    icon: "linkedin" as const,
  },
  {
    label: "Whatsapp",
    href: "https://wa.me/9779840780724",
    icon: "whatsapp" as const,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/subodh_rijal/",
    icon: "instagram" as const,
  },
] as const;

export const PROFILE_IMAGE = "/images/profile/grayscale_subodh.png";
export const PROFILE_REVEAL_IMAGE = "/images/profile/googles_subodh.png";
export const LOGO_IMAGE = "/images/profile/subodh logo.png";
export const LOGO_IMAGE_WHITE = "/images/profile/subodh_white.png";

export const greetings = [
  { text: "hello", font: "latin" },
  { text: "namaste", font: "latin" },
  { text: "bonjour", font: "latin" },
  { text: "你好", font: "chinese" },
  { text: "こんにちは", font: "japanese" },
  { text: "مرحبا", font: "arabic" },
] as const;
