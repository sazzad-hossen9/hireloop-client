import { MoreVertical, Pencil } from "lucide-react"

import { DeleteJobsDialog } from "@/app/components/DeleteJobDialog"
import type { JobPost } from "@/lib/jobs/types"

/** Update / delete / more menu for a single posting. */
export function JobActions({ job }: { job: JobPost }) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label={`Update ${job.jobTitle}`}
        className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary/20 px-3 text-xs font-medium text-[#c3c0ff] transition-colors hover:bg-primary/30"
      >
        <Pencil className="size-3.5" />
        Update
      </button>

      <DeleteJobsDialog jobs={job} />

      <button
        type="button"
        aria-label={`More actions for ${job.jobTitle}`}
        className="inline-flex size-8 items-center justify-center rounded-lg text-[#a1a4aa] transition-colors hover:bg-[#1f1f1f]"
      >
        <MoreVertical className="size-4" />
      </button>
    </div>
  )
}
