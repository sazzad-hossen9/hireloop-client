import type { JobPost } from "@/lib/jobs/types"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/"
  
export const getJobs = async (query = ""): Promise<JobPost[]> => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`)
  return res.json()
}

/** Single job for the public details page; `null` when it no longer exists. */
export const getJobById = async (id: string): Promise<JobPost | null> => {
  const res = await fetch(`${BASE_URL}/jobs/${encodeURIComponent(id)}`, {
    cache: "no-store",
  })

  if (!res.ok) return null

  return res.json()
}
