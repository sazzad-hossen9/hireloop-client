import { requireRole } from "@/lib/core/server"
import React from "react"

const SeekerDashboardPage = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  await requireRole("recruiter")
  return <div></div>
}

export default SeekerDashboardPage
