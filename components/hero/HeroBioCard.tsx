import { CTAButton } from "@/components/ui/CTAButton";

export function HeroBioCard() {
  return (
    <div
      className="floating-card-left"
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
        MERN Developer
      </h1>
      <p className="text-muted text-sm leading-relaxed mb-6">
        Architecting robust web applications that are scalable, efficient, and
        user-centric. Focused on the modern web stack.
      </p>
      <CTAButton hoverScale href="#contact-collaborate">
        Let&apos;s collaborate
      </CTAButton>
    </div>
  );
}
