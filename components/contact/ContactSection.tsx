import { ContactForm } from "@/components/contact/ContactForm";
import { socialLinks } from "@/lib/data";
import { SocialIcon } from "@/components/icons/SocialIcons";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-heading">
        <span>05 / CONTACT</span>
        <div className="contact-heading-copy">
          <h2>Get in touch.</h2>
          <p>Two doors — pick Talk or Collaborate.</p>
        </div>
      </div>

      <div className="contact-grid">
        <ContactForm intent="talk" />
        <ContactForm intent="collaborate" />
      </div>

      <div className="contact-socials">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-link"
          >
            <SocialIcon name={link.icon} />
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
