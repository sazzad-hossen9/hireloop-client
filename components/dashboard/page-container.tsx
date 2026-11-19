import type { FormEventHandler, ReactNode } from "react"

import { cn } from "cn"

const WIDTHS = {
  /** Forms and narrow pages. */
  default: "max-w-5xl",
  /** List/table pages that need more room. */
  wide: "max-w-[1200px]",
}

type DashboardPageProps = {
  /** `wide` keeps the same padding but a 1200px column instead of 1024px. */
  width?: keyof typeof WIDTHS
  /** Render the content column as a `<form>` instead of a `<div>`. */
  as?: "div" | "form"
  onSubmit?: FormEventHandler<HTMLFormElement>
  className?: string
  children: ReactNode
}

/**
 * The dark page frame shared by every dashboard screen:
 * full-height background + responsive padding + centered content column.
 */
export function DashboardPage({
  width = "default",
  as = "div",
  onSubmit,
  className,
  children,
}: DashboardPageProps) {
  const contentClassName = cn(
    "mx-auto flex w-full flex-col gap-6",
    WIDTHS[width],
    className
  )

  return (
    <div className="min-h-svh w-full bg-[#131314] px-4 py-6 lg:px-10 lg:py-10">
      {as === "form" ? (
        <form onSubmit={onSubmit} className={contentClassName}>
          {children}
        </form>
      ) : (
        <div className={contentClassName}>{children}</div>
      )}
    </div>
  )
}
