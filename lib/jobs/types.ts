/**
 * Shared job types.
 *
 * `JobPost` mirrors what the "Post a New Job" form submits, plus the Mongo `_id`
 * that the API returns. Both the list page and the form import from here so the
 * field names can never drift apart.
 */

export type JobType = "full-time" | "part-time" | "contract" | "internship"

export type Frequency = "per hour" | "per day" | "per month" | "per year"

export type JobPost = {
  _id: string
  jobTitle: string
  companyName: string
  jobCategory: string
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: number
  maxSalary: number
  frequency: Frequency
  responsibilities: string
  requirements: string
  /** Table-only extras until the applications feature exists. */
  applicants: number
  postedLabel: string
}
