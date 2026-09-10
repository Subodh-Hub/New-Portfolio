import { socialLinks, LOGO_IMAGE_WHITE } from "@/lib/data";
import Image from "next/image";
import { SocialIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a href="#home" className="footer-brand">
          <Image
            src={LOGO_IMAGE_WHITE}
            alt="Subodh Rijal"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span>Subodh Rijal</span>
        </a>

        <div className="footer-links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <SocialIcon name={link.icon} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Subodh Rijal. All rights reserved.</p>
        <a href="#contact">Available for new projects</a>
      </div>
    </footer>
  );
}
