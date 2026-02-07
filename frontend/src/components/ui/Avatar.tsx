import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
}

export default function Avatar({ src, alt, size = "md", className, onClick }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex-shrink-0 overflow-hidden rounded-full bg-dark-tertiary",
        {
          "h-6 w-6": size === "xs",
          "h-8 w-8": size === "sm",
          "h-10 w-10": size === "md",
          "h-12 w-12": size === "lg",
          "h-20 w-20 border-4 border-surface": size === "xl",
        },
        onClick && "cursor-pointer hover:opacity-80 transition-opacity",
        className
      )}
      onClick={onClick}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
