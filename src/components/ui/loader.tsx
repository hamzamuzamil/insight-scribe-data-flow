
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Loader({ className, size = "md", ...props }: LoaderProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        size === "sm" && "h-4 w-4",
        size === "md" && "h-6 w-6",
        size === "lg" && "h-8 w-8",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "border-t-transparent border-solid animate-spin rounded-full border",
          size === "sm" && "h-4 w-4 border-2",
          size === "md" && "h-6 w-6 border-2",
          size === "lg" && "h-8 w-8 border-4",
          "border-primary"
        )}
      />
    </div>
  );
}
