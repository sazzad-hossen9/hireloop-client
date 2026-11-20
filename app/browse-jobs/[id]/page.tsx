import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  BadgeCheck,
  Banknote,
  Bookmark,
  Briefcase,
  Building2,
  CalendarClock,
  Laptop,
  MapPin,
  type LucideIcon,
} from "lucide-react"
import type { ReactNode } from "react"

import { SiteHeader } from "@/components/site-header"
import { getJobById } from "@/lib/api/jobs"
import { getCategoryStyle } from "@/components/jobs/job-category-icon"
import {
  formatCompensation,
  formatDeadline,
  isExpired,
} from "@/lib/jobs/format"
import { JOB_TYPE_LABELS } from "@/lib/jobs/options"
import { cn } from "cn"

export const metadata: Metadata = {
  title: "Job Details — HireLoop",
}

type JobDetailsPageProps = {
  params: Promise<{ id: string }>
}

const CARD_CLASS =
  "rounded-[12px] border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]"

/** Split a free-text field into list items (new lines or bullet characters). */
function toBullets(text?: string) {
  if (!text) return []

  return text
    .split(/\r?\n|•/)
    .map((item) => item.trim().replace(/^[-*]\s*/, ""))
    .filter(Boolean)
}

/** One of the four overview tiles in the Figma "Bento Info Grid". */
function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className={cn(CARD_CLASS, "flex flex-col gap-1 p-5 sm:p-6")}>
      <Icon className="size-5 text-[#c4c7c8]" />
      <p className="text-[12px] font-medium tracking-[-0.005em] text-[#a0a0ab] uppercase sm:text-[13px]">
        {label}
      </p>
      <p className="text-[15px] leading-6 font-semibold break-words text-[#ededef] sm:text-[16px]">
        {value}
      </p>
    </div>
  )
}

/** A titled block inside the content card, separated by the Figma top border. */
function ContentSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-white/[0.07] pt-6 first:border-t-0 first:pt-0">
      <h2 className="text-[18px] leading-7 font-semibold tracking-[-0.018em] text-[#ededef] sm:text-[22px]">
        {title}
      </h2>
      <div className="mt-6 flex flex-col gap-6">{children}</div>
    </section>
  )
}

/** Small dot + wrapped copy, matching the Figma responsibilities list. */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-[30px] text-[13px] leading-5 tracking-[-0.005em] text-[#a0a0ab]"
        >
          <span
            aria-hidden="true"
            className="absolute top-[7px] left-0 size-1.5 rounded-full bg-white"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) notFound()

  const expired = isExpired(job.deadline)
  const remote = job.isRemote === true || String(job.isRemote) === "yes"
  const location = remote ? `Remote (${job.location})` : job.location
  const jobTypeLabel = JOB_TYPE_LABELS[job.jobType] ?? job.jobType
  const responsibilities = toBullets(job.responsibilities)
  const requirements = toBullets(job.requirements)
  const { icon: CategoryIcon, className: categoryAccent } = getCategoryStyle(
    job.jobCategory
  )

  const intro = [
    `${job.companyName} is hiring a ${job.jobTitle} for a ${jobTypeLabel.toLowerCase()} ${
      remote ? "remote" : "on-site"
    } role${remote ? `; the team is based in ${job.location}` : ` in ${job.location}`}.`,
    `The position sits within the ${job.jobCategory} team, with compensation of ${formatCompensation(job)}.`,
    expired
      ? `Applications closed on ${formatDeadline(job.deadline)}.`
      : `Applications are open until ${formatDeadline(job.deadline)}.`,
  ].join(" ")

  const overviewRows: { label: string; value: string }[] = [
    { label: "Industry", value: job.jobCategory },
    { label: "Work setup", value: remote ? "Remote" : "On-site" },
  ]

  return (
    <div className="flex min-h-svh flex-col bg-[#08080a]">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-10 lg:px-8 lg:py-16">
        {/* Header card */}
        <section
          aria-labelledby="job-title"
          className={cn(CARD_CLASS, "relative overflow-hidden p-6 sm:p-8")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 size-64 rounded-full bg-white/5 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <span
                aria-hidden="true"
                className="flex size-16 shrink-0 items-center justify-center rounded-[12px] border border-white/[0.07] bg-[#1a1a1f] sm:size-20"
              >
                <CategoryIcon
                  className={cn("size-7 sm:size-8", categoryAccent)}
                />
              </span>

              <div className="min-w-0">
                <h1
                  id="job-title"
                  className="text-[26px] leading-8 font-semibold tracking-[-0.025em] text-[#ededef] sm:text-[32px] sm:leading-10"
                >
                  {job.jobTitle}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-[18px] leading-6 font-semibold tracking-[-0.018em] text-[#a0a0ab] sm:text-[22px] sm:leading-7">
                    {job.companyName}
                  </p>
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-[#8e9192]"
                  />
                  <p
                    className={cn(
                      "inline-flex items-center gap-1.5 text-[14px] font-semibold sm:text-[16px]",
                      expired ? "text-[#8e9192]" : "text-[#22c55e]"
                    )}
                  >
                    <BadgeCheck className="size-4" />
                    {expired ? "Applications closed" : "Applications open"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 self-start lg:self-auto">
              <button
                type="button"
                aria-label={`Save ${job.jobTitle}`}
                className="inline-flex size-12 items-center justify-center rounded-[8px] border border-white/[0.07] bg-[#222228] text-[#e5e2e3] transition-colors hover:bg-[#2a2a31]"
              >
                <Bookmark className="size-[18px]" />
              </button>

              <button
                type="button"
                disabled={expired}
                className={cn(
                  "inline-flex h-12 min-w-[115px] items-center justify-center rounded-[8px] px-4 text-[15px] font-medium transition-colors",
                  expired
                    ? "cursor-not-allowed bg-white/10 text-[#8e9192]"
                    : "bg-[#fafafa] text-[#0b0b0c] hover:bg-white/90"
                )}
              >
                {expired ? "Closed" : "Apply Now"}
              </button>
            </div>
          </div>
        </section>

        {/* Bento info grid */}
        <div className="mt-6 grid auto-rows-fr grid-cols-2 gap-4 lg:grid-cols-4">
          <InfoCard
            icon={Banknote}
            label="Salary range"
            value={formatCompensation(job)}
          />
          <InfoCard icon={MapPin} label="Location" value={location} />
          <InfoCard icon={Briefcase} label="Job type" value={jobTypeLabel} />
          <InfoCard
            icon={CalendarClock}
            label="Deadline"
            value={formatDeadline(job.deadline)}
          />
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_397px]">
          {/* Job description card */}
          <div
            className={cn(CARD_CLASS, "flex min-w-0 flex-col gap-6 p-6 sm:p-8")}
          >
            <ContentSection title="Job Description">
              <p className="text-[13px] leading-5 tracking-[-0.005em] text-[#a0a0ab]">
                {intro}
              </p>
            </ContentSection>

            {responsibilities.length > 0 && (
              <ContentSection title="Responsibilities">
                <BulletList items={responsibilities} />
              </ContentSection>
            )}

            {requirements.length > 0 && (
              <ContentSection title="Requirements">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-white/10 bg-[#1a1a1f] px-3.5 text-[13px] font-medium text-[#ededef]">
                    <CategoryIcon className="size-3.5 text-[#a1a4aa]" />
                    {job.jobCategory}
                  </span>
                  <span className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-white/10 bg-[#1a1a1f] px-3.5 text-[13px] font-medium text-[#ededef]">
                    <Briefcase className="size-3.5 text-[#a1a4aa]" />
                    {jobTypeLabel}
                  </span>
                  <span className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-white/10 bg-[#1a1a1f] px-3.5 text-[13px] font-medium text-[#ededef]">
                    {remote ? (
                      <Laptop className="size-3.5 text-[#a1a4aa]" />
                    ) : (
                      <Building2 className="size-3.5 text-[#a1a4aa]" />
                    )}
                    {remote ? "Remote" : "On-site"}
                  </span>
                </div>

                <BulletList items={requirements} />
              </ContentSection>
            )}
          </div>

          {/* Company overview sidebar */}
          <aside className={cn(CARD_CLASS, "flex flex-col gap-6 p-6")}>
            <h2 className="text-[18px] leading-7 font-semibold tracking-[-0.018em] text-[#ededef] sm:text-[22px]">
              Company Overview
            </h2>

            <div className="relative h-[204px] overflow-hidden rounded-[12px] border border-white/[0.05] bg-[#1a1a1f]">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(120% 120% at 88% 8%, rgba(92,83,254,0.35), transparent 58%), radial-gradient(90% 90% at 8% 92%, rgba(56,189,248,0.16), transparent 55%)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              />
              <CategoryIcon
                aria-hidden="true"
                className={cn(
                  "absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 opacity-25",
                  categoryAccent
                )}
              />

              <div className="absolute inset-x-5 bottom-5">
                <p className="truncate text-[15px] font-semibold text-[#ededef]">
                  {job.companyName}
                </p>
                <p className="mt-0.5 truncate text-[12px] text-[#a0a0ab]">
                  {job.jobCategory}
                </p>
              </div>
            </div>

            <dl className="flex flex-col">
              {overviewRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-t border-white/[0.07] py-3.5"
                >
                  <dt className="text-[13px] tracking-[-0.005em] text-[#a0a0ab] uppercase">
                    {row.label}
                  </dt>
                  <dd className="text-right text-[16px] text-[#ededef]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href="/browse-jobs"
              className="flex h-11 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-[13px] font-medium text-[#ededef] transition-colors hover:bg-white/[0.07]"
            >
              Browse More Jobs
            </Link>
          </aside>
        </div>
      </main>
    </div>
  )
}
