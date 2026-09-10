import { ArrowIcon } from "@/components/icons/ArrowIcon";

type CTAButtonProps = {
  children: React.ReactNode;
  className?: string;
  hoverScale?: boolean;
  href?: string;
  type?: "button" | "submit";
};

export function CTAButton({
  children,
  className = "",
  hoverScale = false,
  href,
  type = "button",
}: CTAButtonProps) {
  const classes = `bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-primary-hover transition-all group ${
    hoverScale ? "py-3 hover:scale-105 transition-transform" : ""
  } ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
      <ArrowIcon />
    </button>
  );
}
