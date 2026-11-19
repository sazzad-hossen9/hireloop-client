import { FREQUENCY_UNITS } from "@/lib/jobs/options"
import type { JobPost } from "@/lib/jobs/types"

/** `25000` → `$25k`, `40` → `$40`. */
export function formatSalary(value: number) {
  return value >= 1000 ? `$${Math.round(value / 1000)}k` : `$${value}`
}

/** `$25 – $40 / hr` */
export function formatCompensation(
  job: Pick<JobPost, "minSalary" | "maxSalary" | "frequency">
) {
  return `${formatSalary(job.minSalary)} – ${formatSalary(job.maxSalary)} / ${FREQUENCY_UNITS[job.frequency]}`
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
})

/** `"2026-12-30"` → `"Dec 30, 2026"`. */
export function formatDeadline(deadline: string) {
  return dateFormatter.format(new Date(deadline))
}

/** Status is derived from the deadline — there is no extra status field. */
export function isExpired(deadline: string) {
  return new Date(deadline).getTime() < Date.now()
}

/** `"New York, USA"` → `"Remote (New York, USA)"` when the role is remote. */
export function formatLocation(job: Pick<JobPost, "isRemote" | "location">) {
  return job.isRemote ? `Remote (${job.location})` : job.location
}
