
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export const Logo = ({
  className,
  textClassName,
  size = "md",
  withText = true,
}: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-lg bg-primary p-1.5 flex items-center justify-center",
          size === "sm" && "p-1",
          size === "lg" && "p-2"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "text-background",
            size === "sm" && "h-3 w-3",
            size === "md" && "h-5 w-5",
            size === "lg" && "h-6 w-6"
          )}
        >
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      </div>
      {withText && (
        <span
          className={cn(
            "font-semibold text-foreground",
            size === "sm" && "text-sm",
            size === "md" && "text-lg",
            size === "lg" && "text-xl",
            textClassName
          )}
        >
          ProReporter
        </span>
      )}
    </div>
  );
};
