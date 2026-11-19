import type { ReactNode } from "react"

import { cn } from "cn"

type SectionCardProps = {
  title: string
  className?: string
  children: ReactNode
}

/** A form section: dotted accent + heading above a stack of fields. */
export function SectionCard({ title, className, children }: SectionCardProps) {
  return (
    <section className={cn("rounded-[16px] bg-[#151516] p-6", className)}>
      <div className="mb-5 flex items-center gap-2">
        <span className="size-2 rounded-full bg-primary" />
        <h2 className="text-base font-medium text-white">{title}</h2>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}
