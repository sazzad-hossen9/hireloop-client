import { FileUser } from "lucide-react"
import { cn } from "cn"

import { ApplicationStatusSelect } from "@/components/applications/application-status-select"
import { formatAppliedDate } from "@/lib/applications/format"
import type { JobApplication } from "@/lib/applications/types"

const COLUMNS = [
  "Candidate Name",
  "Role",
  "Date Applied",
  "Experience",
  "Status",
] as const

/**
 * Row-card cell. The first/last cells round the outer corners, so every row
 * reads as a separate card the way the recruiter table is designed.
 */
const CELL_CLASS =
  "border-y border-[#232327] bg-[#17171b] px-4 py-3 align-middle transition-colors group-hover:bg-[#1b1b20]"

/** `"Jobseeker One"` → `"JO"`. The snapshot has no profile photo. */
function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "?"
  )
}

function ApplicantAvatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#c3c0ff]/15 text-[11px] font-semibold text-[#c3c0ff] ring-1 ring-white/10"
    >
      {getInitials(name)}
    </span>
  )
}

function CandidateCell({ application }: { application: JobApplication }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <ApplicantAvatar name={application.applicantName} />
      <div className="min-w-0">
        <p className="truncate text-[13px] leading-5 font-medium text-[#ededef]">
          {application.applicantName}
        </p>
        <p className="truncate text-[12px] leading-4 text-[#a0a0ab]">
          {application.applicantEmail}
        </p>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full border border-white/[0.07] bg-[#1a1a1f] text-[#a0a0ab]">
        <FileUser className="size-5" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="text-[15px] leading-6 font-medium text-[#ededef]">
          No applications yet
        </p>
        <p className="text-[13px] leading-5 text-[#a0a0ab]">
          Applications submitted for this job will appear here.
        </p>
      </div>
    </div>
  )
}

type RecruiterApplicationsTableProps = {
  applications: JobApplication[]
}

/**
 * Recruiter-facing applicant list for one job posting.
 *
 * Desktop mirrors the dashboard design: a five-column table where every row is
 * a rounded card. Below `md` the same data becomes stacked cards.
 *
 * Each row's status is an editable pill; the recruiter can move an applicant
 * through the pipeline without leaving the page.
 */
export function RecruiterApplicationsTable({
  applications,
}: RecruiterApplicationsTableProps) {
  if (applications.length === 0) {
    return <EmptyState />
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[820px] border-separate border-spacing-y-2 text-left">
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[24%]" />
            <col className="w-[16%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
          </colgroup>

          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 pb-1 text-[10px] font-medium tracking-[0.08em] whitespace-nowrap text-[#6e6e78] uppercase"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr key={application._id} className="group">
                <td className={cn(CELL_CLASS, "rounded-l-[10px] border-l")}>
                  <CandidateCell application={application} />
                </td>

                <td className={CELL_CLASS}>
                  <p className="truncate text-[13px] leading-5 text-[#d4d4d8]">
                    {application.jobTitle}
                  </p>
                </td>

                <td className={cn(CELL_CLASS, "whitespace-nowrap")}>
                  <p className="text-[13px] leading-5 text-[#a0a0ab]">
                    {formatAppliedDate(application.appliedAt)}
                  </p>
                </td>

                <td className={cn(CELL_CLASS, "whitespace-nowrap")}>
                  <p
                    className={cn(
                      "text-[13px] leading-5",
                      application.experience
                        ? "text-[#d4d4d8]"
                        : "text-[#6e6e78]"
                    )}
                  >
                    {application.experience ?? "—"}
                  </p>
                </td>

                <td className={cn(CELL_CLASS, "rounded-r-[10px] border-r")}>
                  <ApplicationStatusSelect
                    key={`${application._id}-${application.status}`}
                    applicationId={application._id}
                    applicantName={application.applicantName}
                    status={application.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-2 md:hidden">
        {applications.map((application) => (
          <li
            key={application._id}
            className="rounded-[10px] border border-[#232327] bg-[#17171b] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <CandidateCell application={application} />
              <ApplicationStatusSelect
                key={`${application._id}-${application.status}`}
                applicationId={application._id}
                applicantName={application.applicantName}
                status={application.status}
              />
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <dt className="text-[10px] font-medium tracking-[0.08em] text-[#6e6e78] uppercase">
                  Role
                </dt>
                <dd className="mt-0.5 text-[13px] leading-5 text-[#d4d4d8]">
                  {application.jobTitle}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium tracking-[0.08em] text-[#6e6e78] uppercase">
                  Date Applied
                </dt>
                <dd className="mt-0.5 text-[13px] leading-5 text-[#a0a0ab]">
                  {formatAppliedDate(application.appliedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium tracking-[0.08em] text-[#6e6e78] uppercase">
                  Experience
                </dt>
                <dd className="mt-0.5 text-[13px] leading-5 text-[#d4d4d8]">
                  {application.experience ?? "—"}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}
