import { cn } from "cn"
import { JOB_TYPE_LABELS } from "@/lib/jobs/options"
import type { JobType } from "@/lib/jobs/types"

/** Active (deadline in the future) vs Expired. */
export function StatusPill({ expired }: { expired: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap",
        expired
          ? "bg-[#1f1f1f] text-[#a0a0ab]"
          : "bg-[#14532d]/40 text-[#4ade80]"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          expired ? "bg-[#5a5a60]" : "bg-[#4ade80]"
        )}
      />
      {expired ? "Expired" : "Active"}
    </span>
  )
}

/** Full-time / Part-time / Contract / Internship chip. */
export function TypePill({ jobType }: { jobType: JobType }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#232327] bg-[#1f1f1f] px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-[#d4d4d8]">
      {JOB_TYPE_LABELS[jobType]}
    </span>
  )
}
