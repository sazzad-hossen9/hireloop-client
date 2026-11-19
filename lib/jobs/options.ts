import type { Frequency, JobType } from "@/lib/jobs/types"

/** Options for the job-type radio group. */
export const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
] as const satisfies readonly { value: JobType; label: string }[]

/** Options for the category select. */
export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product",
  "Marketing",
  "Sales & Business",
  "Finance & Accounting",
  "Customer Support",
  "Operations",
  "Human Resources",
  "Healthcare",
  "Education",
  "Other",
] as const

/** Options for the pay-frequency select. */
export const FREQUENCIES = [
  "per hour",
  "per day",
  "per month",
  "per year",
] as const satisfies readonly Frequency[]

/** `"full-time"` → `"Full-time"`, used by the type pill. */
export const JOB_TYPE_LABELS: Record<JobType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
}

/** `"per hour"` → `"hr"`, used by the compensation column. */
export const FREQUENCY_UNITS: Record<Frequency, string> = {
  "per hour": "hr",
  "per day": "day",
  "per month": "mo",
  "per year": "yr",
}
