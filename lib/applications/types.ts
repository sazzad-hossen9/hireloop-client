import type { JobType } from "@/lib/jobs/types"

/**
 * Where an application sits in the hiring pipeline.
 *
 * The first five values mirror the status chips in the "Seeker / My
 * Applications" Figma frame; `interview` is included because the same frame
 * reports an "Interviews" stat.
 */
export type ApplicationStatus =
  "applied" | "review" | "shortlisted" | "interview" | "rejected" | "offered"

/** How the role is worked, captured when the application is submitted. */
export type WorkSetup = "remote" | "hybrid" | "onsite"

/**
 * One row of the My Applications table and the full document stored in the
 * `applications` MongoDB collection.
 *
 * Job/company fields are copied at apply time so the table keeps rendering
 * correctly even if the original job post is edited or deleted later.
 */
export type JobApplication = {
  _id: string
  /** `jobs._id` of the role that was applied to. */
  jobId: string
  /** better-auth user id of the applicant. */
  applicantId: string
  applicantName: string
  applicantEmail: string
  jobTitle: string
  companyName: string
  jobCategory: string
  jobType: JobType
  workSetup: WorkSetup
  location: string
  status: ApplicationStatus
  /** ISO timestamp of when the application was submitted. */
  appliedAt: string
  /** Archived applications are hidden from the Active tab. */
  archived: boolean
  updatedAt?: string
}

/**
 * Payload accepted by `POST /applications`.
 *
 * The server owns the lifecycle fields (`status`, `appliedAt`, `archived`,
 * `updatedAt`) but lets a caller override them for imports/seeding.
 */
export type NewJobApplication = Omit<
  JobApplication,
  "_id" | "status" | "appliedAt" | "archived" | "updatedAt"
> & {
  status?: ApplicationStatus
  appliedAt?: string
  archived?: boolean
}
