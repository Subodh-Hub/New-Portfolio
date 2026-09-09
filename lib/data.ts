export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills", count: "16" },
  { label: "Service", href: "#services", count: "4" },
  { label: "Experience", href: "#experience", count: "5y+" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "Github", href: "#", icon: "github" as const },
  { label: "LinkedIn", href: "#", icon: "linkedin" as const },
  { label: "Whatsapp", href: "#", icon: "whatsapp" as const },
  { label: "Instagram", href: "#", icon: "instagram" as const },
] as const;

export const PROFILE_IMAGE = "/images/profile/grayscale_subodh.png";
export const PROFILE_REVEAL_IMAGE = "/images/profile/googles_subodh.png";
export const LOGO_IMAGE = "/images/profile/subodh logo.png";

export const greetings = [
  { text: "Hello", font: "latin" },
  { text: "Namaste", font: "latin" },
  { text: "Bonjour", font: "latin" },
  { text: "你好", font: "chinese" },
  { text: "こんにちは", font: "japanese" },
  { text: "مرحبا", font: "arabic" },
] as const;
