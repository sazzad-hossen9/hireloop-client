"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Loader2 } from "lucide-react"
import { cn } from "cn"

import { toast } from "@/components/ui/toast"
import { updateApplicationStatus } from "@/lib/actions/applications"
import {
  APPLICATION_STATUSES,
  APPLICATION_STATUS_META,
} from "@/lib/applications/options"
import type { ApplicationStatus } from "@/lib/applications/types"

type ApplicationStatusSelectProps = {
  applicationId: string
  applicantName: string
  status: ApplicationStatus
}

/**
 * Editable status pill for one applicant row.
 *
 * The value updates optimistically and rolls back if the request fails. A
 * successful update refreshes the server component so the stat cards and the
 * table stay in sync.
 */
export function ApplicationStatusSelect({
  applicationId,
  applicantName,
  status,
}: ApplicationStatusSelectProps) {
  const router = useRouter()
  const [value, setValue] = React.useState(status)
  const [pending, setPending] = React.useState(false)

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = event.target.value as ApplicationStatus

    if (nextStatus === value || pending) return

    const previousStatus = value
    setValue(nextStatus)
    setPending(true)

    try {
      const result = await updateApplicationStatus(applicationId, nextStatus)

      if (result.updated) {
        toast.add({
          type: "success",
          description: `${applicantName}'s status is now ${
            APPLICATION_STATUS_META[nextStatus].label
          }.`,
        })
        router.refresh()
      } else {
        setValue(previousStatus)
        toast.add({
          type: "error",
          description: result.message ?? "Could not update the status.",
        })
      }
    } catch {
      setValue(previousStatus)
      toast.add({
        type: "error",
        description: "Could not update the status. Try again.",
      })
    } finally {
      setPending(false)
    }
  }

  const meta = APPLICATION_STATUS_META[value]

  return (
    <div className="relative inline-flex">
      <select
        aria-label={`Update status for ${applicantName}`}
        value={value}
        onChange={handleChange}
        disabled={pending}
        className={cn(
          "h-6 cursor-pointer appearance-none rounded-full border pr-7 pl-3 text-[12px] leading-4 font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/25 disabled:cursor-wait disabled:opacity-70",
          meta.badgeClassName
        )}
      >
        {APPLICATION_STATUSES.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#17171b] text-[#ededef]"
          >
            {APPLICATION_STATUS_META[option].label}
          </option>
        ))}
      </select>

      {pending ? (
        <Loader2
          className="pointer-events-none absolute top-1/2 right-2 size-3 -translate-y-1/2 animate-spin text-white/60"
          aria-hidden="true"
        />
      ) : (
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-2 size-3 -translate-y-1/2 text-white/60"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
