import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  className?: string;
  size?: number;
}

export default function VerifiedBadge({ className, size = 16 }: VerifiedBadgeProps) {
  return (
    <BadgeCheck
      className={cn("inline-block fill-primary text-surface", className)}
      size={size}
    />
  );
}
