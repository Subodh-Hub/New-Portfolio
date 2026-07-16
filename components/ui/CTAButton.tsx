import { ArrowIcon } from "@/components/icons/ArrowIcon";

type CTAButtonProps = {
  children: React.ReactNode;
  className?: string;
  hoverScale?: boolean;
};

export function CTAButton({
  children,
  className = "",
  hoverScale = false,
}: CTAButtonProps) {
  return (
    <button
      type="button"
      className={`bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary-hover transition-all group ${
        hoverScale ? "py-3 hover:scale-105 transition-transform" : ""
      } ${className}`}
    >
      {children}
      <ArrowIcon />
    </button>
  );
}
