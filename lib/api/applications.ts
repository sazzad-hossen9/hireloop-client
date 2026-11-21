import type {
  ApplicationStatus,
  JobApplication,
} from "@/lib/applications/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export type ApplicationFilters = {
  applicantId: string
  status?: ApplicationStatus | ApplicationStatus[]
  archived?: boolean
  search?: string
}

/**
 * Applications for one seeker, newest first.
 *
 * Used by `/dashboard/seeker/applications`; the page fetches every row for the
 * signed-in seeker and splits Active/Archived locally so the stat cards keep
 * counting both tabs.
 */
export async function getApplications(
  filters: ApplicationFilters
): Promise<JobApplication[]> {
  const params = new URLSearchParams({ applicantId: filters.applicantId })

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




const GetApplicationsCount =async (query=""): Promise<{count:number}>=> {
 const res = await fetch(`${BASE_URL}/applications/count?${query}`, {
    cache: "no-store",
  })
  return res.json()
};

export default GetApplicationsCount;