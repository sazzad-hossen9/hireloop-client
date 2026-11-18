import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export type DashboardRole = "seeker" | "recruiter" | "admin"

export type DashboardNavItem = {
  /** Stable unique key, used as the React `key` and for analytics later. */
  id: string
  /** Label rendered in the sidebar. */
  name: string
  /** Route the item links to. */
  url: string
  /** Lucide icon component rendered before the label. */
  icon: LucideIcon
  /**
   * When true the item is active only on an exact pathname match.
   * Needed for the "Dashboard" entry, whose URL is the parent of every
   * other item (`/dashboard/seeker` vs `/dashboard/seeker/jobs`).
   */
  exact?: boolean
}

/**
 * Sidebar menu items per role, mirroring the "HL 2.0/Sidebar" variants in the
 * Figma file (Job Seeker / Recruiter / Admin).
 */
export const menuItemByRole: Record<DashboardRole, DashboardNavItem[]> = {
  seeker: [
    {
      id: "seeker-dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      id: "seeker-jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Briefcase,
    },
    {
      id: "seeker-saved-jobs",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      id: "seeker-applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "seeker-billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: Wallet,
    },
    {
      id: "seeker-settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "recruiter-dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      id: "recruiter-company",
      name: "My Company",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },
    {
      id: "recruiter-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      id: "add-job",
      name: "add Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "recruiter-applications",
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      id: "recruiter-settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "admin-dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      id: "admin-users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "admin-jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      id: "admin-payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: Wallet,
    },
    {
      id: "admin-settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

/** Whether a sidebar item should be highlighted for the current pathname. */
export function isNavItemActive(item: DashboardNavItem, pathname: string) {
  if (item.exact) return pathname === item.url
  return pathname === item.url || pathname.startsWith(`${item.url}/`)
}
