import Link from "next/link"
import { FileText } from "lucide-react"
import { cn } from "cn"

import { StatusChip } from "@/components/applications/status-chip"
import { getCategoryStyle } from "@/components/jobs/job-category-icon"
import { formatRelativeTime } from "@/lib/applications/format"
import { WORK_SETUP_LABELS } from "@/lib/applications/options"
import type { JobApplication } from "@/lib/applications/types"
import { JOB_TYPE_LABELS } from "@/lib/jobs/options"

/** 32px rounded tile with the category glyph, matching the Figma row icon. */
function ApplicationIcon({ category }: { category: string }) {
  const { icon: Icon, className } = getCategoryStyle(category)

  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#222228]"
    >
      <Icon className={cn("size-4", className)} />
    </span>
  )
}

function metaLine(application: JobApplication) {
  return `${JOB_TYPE_LABELS[application.jobType]} • ${WORK_SETUP_LABELS[application.workSetup]}`
}

function EmptyState({ archived }: { archived: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full border border-white/[0.07] bg-[#1a1a1f]">
        <FileText className="size-5 text-[#a0a0ab]" aria-hidden="true" />
      </span>

      <div>
        <p className="text-[15px] leading-6 font-medium text-[#ededef]">
          {archived ? "No archived applications" : "No applications yet"}
        </p>
        <p className="mt-1 text-[13px] leading-5 text-[#a0a0ab]">
          {archived
            ? "Applications you archive will appear here."
            : "Applications you submit will appear here."}
        </p>
      </div>

      {!archived && (
        <Link
          href="/browse-jobs"
          className="mt-1 inline-flex h-9 items-center rounded-[8px] bg-[#fafafa] px-4 text-[13px] font-medium text-[#0b0b0c] transition-colors hover:bg-white"
        >
          Browse jobs
        </Link>
      )}
    </div>
  )
}

type ApplicationsTableProps = {
  applications: JobApplication[]
  /** Drives the empty-state copy for the Archived tab. */
  archived: boolean
}

/**
 * My Applications table from the "Seeker / My Applications" Figma frame.
 *
 * Desktop keeps the 5-column layout; below `md` the same rows become stacked
 * cards so the table never overflows a phone.
 */
export function ApplicationsTable({
  applications,
  archived,
}: ApplicationsTableProps) {
  if (applications.length === 0) {
    return <EmptyState archived={archived} />
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <colgroup>
            <col className="w-[30%]" />
            <col className="w-[20%]" />
            <col className="w-[15%]" />
            <col className="w-[18%]" />
            <col className="w-[17%]" />
          </colgroup>

          <thead>
            <tr className="h-11 border-b border-white/[0.07] bg-[#1a1a1f]">
              <th
                scope="col"
                className="pr-4 pl-7 text-[12px] leading-4 font-medium text-[#6e6e78]"
              >
                Job Title
              </th>
              <th
                scope="col"
                className="px-4 text-[12px] leading-4 font-medium text-[#6e6e78]"
              >
                Company
              </th>
              <th
                scope="col"
                className="px-4 text-[12px] leading-4 font-medium text-[#6e6e78]"
              >
                Applied
              </th>
              <th
                scope="col"
                className="px-4 text-[12px] leading-4 font-medium text-[#6e6e78]"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 text-right text-[12px] leading-4 font-medium text-[#6e6e78]"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="[&>tr+tr]:border-t [&>tr+tr]:border-white/[0.07]">
            {applications.map((application) => (
              <tr
                key={application._id}
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="h-16 pr-4 pl-7">
                  <div className="flex items-center gap-3">
                    <ApplicationIcon category={application.jobCategory} />
                    <div className="min-w-0">
                      <p className="truncate text-[13px] leading-5 font-medium tracking-[-0.005em] text-[#ededef]">
                        {application.jobTitle}
                      </p>
                      <p className="truncate text-[12px] leading-4 text-[#a0a0ab]">
                        {metaLine(application)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="h-16 px-4">
                  <p className="truncate text-[13px] leading-5 tracking-[-0.005em] text-[#ededef]">
                    {application.companyName}
                  </p>
                </td>

                <td className="h-16 px-4">
                  <p className="text-[13px] leading-5 whitespace-nowrap text-[#a0a0ab]">
                    {formatRelativeTime(application.appliedAt)}
                  </p>
                </td>

                <td className="h-16 px-4">
                  <StatusChip status={application.status} />
                </td>

                <td className="h-16 px-4 text-right">
                  <Link
                    href={`/browse-jobs/${application.jobId}`}
                    aria-label={`View details for ${application.jobTitle}`}
                    className="text-[13px] leading-5 tracking-[-0.005em] text-[#ededef] transition-colors hover:text-white hover:underline"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-white/[0.07] md:hidden">
        {applications.map((application) => (
          <li key={application._id} className="flex flex-col gap-3 p-4">
            <div className="flex items-start gap-3">
              <ApplicationIcon category={application.jobCategory} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] leading-5 font-medium text-[#ededef]">
                  {application.jobTitle}
                </p>
                <p className="truncate text-[12px] leading-4 text-[#a0a0ab]">
                  {metaLine(application)}
                </p>
                <p className="mt-1 truncate text-[12px] leading-4 text-[#a0a0ab]">
                  {application.companyName}
                </p>
              </div>

              <StatusChip status={application.status} />
            </div>

            <div className="flex items-center justify-between pl-11">
              <p className="text-[12px] text-[#a0a0ab]">
                {formatRelativeTime(application.appliedAt)}
              </p>
              <Link
                href={`/browse-jobs/${application.jobId}`}
                aria-label={`View details for ${application.jobTitle}`}
                className="text-[13px] font-medium text-[#ededef] transition-colors hover:text-white hover:underline"
              >
                Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
