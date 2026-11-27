"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { toast } from "@/components/ui/toast"
import { createApplication } from "@/lib/actions/applications"
import { useSession } from "@/lib/auth-client"
import type { JobPost } from "@/lib/jobs/types"
import { cn } from "cn"
import GetApplicationsCount from "@/lib/api/applications"
import { getUserPremiumById } from "@/lib/api/user"

/**
 * Persists the application, then sends the seeker to My Applications.
 *
 * The payload includes every field the dashboard table renders so the row
 * keeps working even if the job post is edited or deleted later.
 */
const ApplyNow = ({ expired, job }: { expired: boolean; job: JobPost }) => {
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()
  const [pending, setPending] = React.useState(false)

  const handleApplyNow = async () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    }

    if (user.role !== "seeker") {
      toast.add({
        type: "error",
        description: "Only job seekers can apply to jobs.",
      })
      return
    }

    const remote = job.isRemote === true || String(job.isRemote) === "yes"
    const premiumResult = await getUserPremiumById(session?.user?.id)
    setPending(true)
    try {
      const resultCount = await GetApplicationsCount(`applicantId=${user.id}`)
      if (!premiumResult.premium && resultCount.count >= 2) {
        toast.add({
          type: "info",
          description:
            "You’ve reached the free application limit. Please upgrade to continue.",
        })
        router.push("/payment")
        return
      }
      const result = await createApplication({
        jobId: job._id,
        applicantId: user.id,
        applicantName: user.name,
        applicantEmail: user.email,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        jobCategory: job.jobCategory,
        jobType: job.jobType,
        workSetup: remote ? "remote" : "onsite",
        location: job.location,
        status: "applied",
        appliedAt: new Date().toISOString(),
        archived: false,
      })

      if (result.insertedId) {
        toast.add({
          type: "success",
          description: "Application submitted successfully.",
        })
        router.push("/dashboard/seeker/applications")
      } else {
        toast.add({
          type: "error",
          description:
            result.message ?? "Could not submit your application. Try again.",
        })
      }
    } catch {
      toast.add({
        type: "error",
        description: "Could not submit your application. Try again.",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleApplyNow}
        type="button"
        disabled={expired || pending}
        className={cn(
          "inline-flex h-12 min-w-[115px] items-center justify-center rounded-[8px] px-4 text-[15px] font-medium transition-colors",
          expired || pending
            ? "cursor-not-allowed bg-white/10 text-[#8e9192]"
            : "bg-[#fafafa] text-[#0b0b0c] hover:bg-white/90"
        )}
      >
        {expired ? "Closed" : pending ? "Applying..." : "Apply Now"}
      </button>
    </div>
  )
}

export default ApplyNow
