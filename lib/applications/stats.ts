import type {
  ApplicationStatus,
  JobApplication,
} from "@/lib/applications/types"

export type ApplicationStats = {
  total: number
  shortlisted: number
  interviews: number
  /** Offered applications as a whole percentage, e.g. `12`. */
  successRate: number
}

/** Derive the four stats cards from the application list. */
export function getApplicationStats(
  applications: JobApplication[]
): ApplicationStats {
  const count = (status: ApplicationStatus) =>
    applications.filter((application) => application.status === status).length

  const total = applications.length
  const offered = count("offered")

  return {
    total,
    shortlisted: count("shortlisted"),
    interviews: count("interview"),
    // Floor keeps the rate from rounding 3/24 up to a misleading 13%.
    successRate: total === 0 ? 0 : Math.floor((offered / total) * 100),
  }
}
