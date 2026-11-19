import {
  Applicants,
  CompanyLocation,
  Deadline,
  JobTitleCell,
} from "@/components/jobs/job-cells"
import { JobActions } from "@/components/jobs/job-actions"
import { StatusPill, TypePill } from "@/components/jobs/job-badges"
import { formatCompensation, isExpired } from "@/lib/jobs/format"
import type { JobPost } from "@/lib/jobs/types"

/** Narrow-screen posting list: same data as the table, stacked as cards. */
export function JobsCardList({ jobs }: { jobs: JobPost[] }) {
  return (
    <ul className="flex flex-col divide-y divide-[#232327] lg:hidden">
      {jobs.map((job) => {
        const expired = isExpired(job.deadline)

        return (
          <li key={job._id} className="flex flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <JobTitleCell job={job} />
              <StatusPill expired={expired} />
            </div>

            <div>
              <CompanyLocation job={job} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <TypePill jobType={job.jobType} />
              <span className="text-[13px] font-medium text-white">
                {formatCompensation(job)}
              </span>
              <Applicants count={job.applicants} />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <Deadline job={job} />
              </div>
              <JobActions job={job} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
