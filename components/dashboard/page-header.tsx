import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { cn } from "cn"

export type BreadcrumbItem = {
  label: string
  /** When present the item renders as a link back to that route. */
  href?: string
}

/**
 * `Manage Jobs › Job Listings & Postings`
 *
 * The last item is highlighted; intermediate items become links when they
 * have an `href`.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-[13px]"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {index > 0 && (
              <ChevronRight className="size-3 shrink-0 text-[#a0a0ab]" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-[#a0a0ab] transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  isLast ? "font-medium text-[#c3c0ff]" : "text-[#a0a0ab]"
                )}
              >
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

type PageHeaderProps = {
  breadcrumb: BreadcrumbItem[]
  title: string
  description?: string
  /** Primary action rendered on the right of the heading on wide screens. */
  action?: ReactNode
}

/** Breadcrumb + page title + one-line description, with an optional action. */
export function PageHeader({
  breadcrumb,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <Breadcrumb items={breadcrumb} />
        <h1 className="font-heading text-[32px] leading-tight font-medium text-white">
          {title}
        </h1>
        {description && <p className="text-sm text-[#a0a0ab]">{description}</p>}
      </div>
      {action}
    </div>
  )
}
