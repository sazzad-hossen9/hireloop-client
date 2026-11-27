import Link from "next/link"
import { FileText, MoreVertical, Pencil } from "lucide-react"

import { DeleteJobsDialog } from "@/app/components/DeleteJobDialog"
import type { JobPost } from "@/lib/jobs/types"

/** Row actions for a posting in the recruiter jobs table. */
export function JobActions({ job }: { job: JobPost }) {
  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={`/dashboard/recruiter/jobs/${job._id}/applications`}
        aria-label={`View applications for ${job.jobTitle}`}
        className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#232327] bg-[#1e1e21] px-3 text-xs font-medium whitespace-nowrap text-[#ededef] transition-colors hover:bg-[#25252b]"
      >
        <FileText className="size-3.5" aria-hidden="true" />
        Applications
      </Link>

      <button
        type="button"
        aria-label={`Update ${job.jobTitle}`}
        className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary/20 px-3 text-xs font-medium text-[#c3c0ff] transition-colors hover:bg-primary/30"
      >
        <Pencil className="size-3.5" aria-hidden="true" />
        Update
      </button>

      <DeleteJobsDialog jobs={job} />

      <button
        type="button"
        aria-label={`More actions for ${job.jobTitle}`}
        className="inline-flex size-8 items-center justify-center rounded-lg text-[#a1a4aa] transition-colors hover:bg-[#1f1f1f]"
      >
        <MoreVertical className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
