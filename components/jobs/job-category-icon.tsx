import {
  Briefcase,
  Code2,
  Megaphone,
  Package,
  Palette,
  type LucideIcon,
} from "lucide-react"

import { cn } from "cn"

/** Category accent + icon, mirroring the coloured icons used in the Figma designs. */
const CATEGORY_STYLES: Record<string, { icon: LucideIcon; className: string }> =
  {
    "Engineering & Tech": { icon: Code2, className: "text-[#38bdf8]" },
    "Design & Creative": { icon: Palette, className: "text-[#f97316]" },
    Product: { icon: Package, className: "text-[#c7d2fe]" },
    Marketing: { icon: Megaphone, className: "text-[#c3c0ff]" },
  }

const FALLBACK_CATEGORY = { icon: Briefcase, className: "text-[#a0a0ab]" }

/** Icon + accent colour for a job category (falls back to a generic briefcase). */
export function getCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] ?? FALLBACK_CATEGORY
}

const SIZES = {
  /** Compact tile used in tables. */
  sm: "size-9 rounded-lg bg-[#232327]",
  /** Large tile used in public job cards. */
  md: "size-14 rounded-xl border border-white/[0.07] bg-[#222228] sm:size-16",
}

type JobCategoryIconProps = {
  category: string
  size?: keyof typeof SIZES
  className?: string
}

/** Rounded category icon tile, shared by the dashboard table and job cards. */
export function JobCategoryIcon({
  category,
  size = "sm",
  className,
}: JobCategoryIconProps) {
  const { icon: Icon, className: accent } = getCategoryStyle(category)
  const iconSize = size === "sm" ? "size-5" : "size-6"

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center",
        SIZES[size],
        className
      )}
    >
      <Icon className={cn(iconSize, accent)} />
    </span>
  )
}
