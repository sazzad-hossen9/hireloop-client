import type { UserRole } from "@/lib/users/types"

type RoleMeta = {
  label: string
  /** Tinted chip used for the current role and the active toggle button. */
  badgeClassName: string
  /** Avatar colours so roles are scannable at a glance. */
  avatarClassName: string
}

/** Labels and colours for the admin user-management screen. */
export const USER_ROLE_META: Record<UserRole, RoleMeta> = {
  seeker: {
    label: "Seeker",
    badgeClassName: "border-[#60a5fa]/30 bg-[#60a5fa]/15 text-[#60a5fa]",
    avatarClassName: "bg-[#60a5fa]/15 text-[#93c5fd] ring-[#60a5fa]/20",
  },
  recruiter: {
    label: "Recruiter",
    badgeClassName: "border-[#c084fc]/30 bg-[#c084fc]/15 text-[#c084fc]",
    avatarClassName: "bg-[#c084fc]/15 text-[#d8b4fe] ring-[#c084fc]/20",
  },
  admin: {
    label: "Admin",
    badgeClassName: "border-[#f59e0b]/30 bg-[#f59e0b]/15 text-[#f59e0b]",
    avatarClassName: "bg-[#f59e0b]/15 text-[#fbbf24] ring-[#f59e0b]/20",
  },
}
