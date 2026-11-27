import type {
  ApplicationStatus,
  JobApplication,
} from "@/lib/applications/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export type ApplicationFilters = {
  /** Filter by seeker. */
  applicantId?: string
  /** Filter by job, used by recruiters viewing applicants for a posting. */
  jobId?: string
  status?: ApplicationStatus | ApplicationStatus[]
  archived?: boolean
  search?: string
}

/**
 * Applications matching the given filters, newest first.
 *
 * Pass `applicantId` for a seeker's own applications, or `jobId` for a
 * recruiter's view of applicants to a specific job.
 */
export async function getApplications(
  filters: ApplicationFilters
): Promise<JobApplication[]> {
  const params = new URLSearchParams()

  if (filters.applicantId) params.set("applicantId", filters.applicantId)
  if (filters.jobId) params.set("jobId", filters.jobId)

  if (filters.status) {
    const statuses = Array.isArray(filters.status)
      ? filters.status
      : [filters.status]
    statuses.forEach((status) => params.append("status", status))
  }

  if (filters.archived !== undefined) {
    params.set("archived", String(filters.archived))
  }

  if (filters.search) {
    params.set("search", filters.search)
  }

  const res = await fetch(`${BASE_URL}/applications?${params.toString()}`, {
    cache: "no-store",
  })

  if (!res.ok) return []

  return res.json()
}

const GetApplicationsCount = async (query = ""): Promise<{ count: number }> => {
  const res = await fetch(`${BASE_URL}/applications/count?${query}`, {
    cache: "no-store",
  })
  return res.json()
}

export default GetApplicationsCount
