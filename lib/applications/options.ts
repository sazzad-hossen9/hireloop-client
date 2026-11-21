import type { ApplicationStatus, WorkSetup } from "@/lib/applications/types"

/** Every status in display order, useful for filters and seeds. */
export const APPLICATION_STATUSES = [
  "applied",
  "review",
  "shortlisted",
  "interview",
  "rejected",
  "offered",
] as const satisfies readonly ApplicationStatus[]

type StatusMeta = {
  label: string
  /** Border + tinted background + text, matching the Figma status chips. */
  badgeClassName: string
}

/** Status label and chip colours from the "Seeker / My Applications" frame. */
export const APPLICATION_STATUS_META: Record<ApplicationStatus, StatusMeta> = {
  applied: {
    label: "Applied",
    badgeClassName: "border-white/10 bg-[#a1a4aa]/15 text-[#a0a0ab]",
  },
  review: {
    label: "Review",
    badgeClassName: "border-[#f59e0b]/30 bg-[#f59e0b]/15 text-[#f59e0b]",
  },
  shortlisted: {
    label: "Shortlisted",
    badgeClassName: "border-[#60a5fa]/30 bg-[#60a5fa]/15 text-[#60a5fa]",
  },
  interview: {
    label: "Interview",
    badgeClassName: "border-[#c084fc]/30 bg-[#c084fc]/15 text-[#c084fc]",
  },
  rejected: {
    label: "Rejected",
    badgeClassName: "border-[#ef4444]/30 bg-[#ef4444]/15 text-[#ef4444]",
  },
  offered: {
    label: "Offered",
    badgeClassName: "border-[#22c55e]/30 bg-[#22c55e]/15 text-[#22c55e]",
  },
}

/** `"onsite"` → `"On-site"`, used in the job-title meta line. */
export const WORK_SETUP_LABELS: Record<WorkSetup, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
}
