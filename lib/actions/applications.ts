import type {
  ApplicationStatus,
  NewJobApplication,
} from "@/lib/applications/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export type CreateApplicationResult = {
  acknowledged?: boolean
  insertedId?: string
  /** Present when the server rejects the request (validation, duplicate, …). */
  message?: string
}

/**
 * Persist one job application.
 *
 * The server fills `status`, `appliedAt`, `archived`, and `updatedAt` defaults
 * and rejects a second active application for the same job.
 */
export async function createApplication(
  data: NewJobApplication
): Promise<CreateApplicationResult> {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return res.json()
}

/** Backwards-compatible default used by the job details page. */
export default createApplication

export type UpdateApplicationStatusResult = {
  updated?: boolean
  status?: ApplicationStatus
  /** Present when the server rejects the request. */
  message?: string
}

/**
 * Move one application to a new pipeline stage.
 *
 * Called from the recruiter applications table; the server stamps `updatedAt`
 * and returns the new status so the UI can confirm the change.
 */
export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<UpdateApplicationStatusResult> {
  const res = await fetch(
    `${BASE_URL}/applications/${encodeURIComponent(applicationId)}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  )

  const body: UpdateApplicationStatusResult | null = await res
    .json()
    .catch(() => null)

  if (!res.ok) {
    return {
      message: body?.message ?? "Could not update the application status.",
    }
  }

  return { updated: true, status: body?.status ?? status }
}
