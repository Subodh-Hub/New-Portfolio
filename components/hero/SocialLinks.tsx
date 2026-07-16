import { SocialIcon } from "@/components/icons/SocialIcons";
import { socialLinks } from "@/lib/data";

export function SocialLinks() {
  return (
    <div
      className="social-links-right"
      style={{ opacity: 0, visibility: "hidden" }}
    >
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="flex items-center justify-between gap-4 px-4 py-2 border border-border rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white/50"
        >
          <span className="flex items-center gap-2">
            <SocialIcon name={link.icon} />
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
}
