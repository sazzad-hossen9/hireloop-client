import { cn } from "cn"

import { APPLICATION_STATUS_META } from "@/lib/applications/options"
import type { ApplicationStatus } from "@/lib/applications/types"

/** 22px tinted chip used in the status column of the applications table. */
export function StatusChip({ status }: { status: ApplicationStatus }) {
  const meta = APPLICATION_STATUS_META[status]

  return (
    <span
      className={cn(
        "inline-flex h-[22px] shrink-0 items-center rounded-[4px] border px-2.5 text-[12px] leading-4 font-medium whitespace-nowrap",
        meta.badgeClassName
      )}
    >
      {meta.label}
    </span>
  )
}
