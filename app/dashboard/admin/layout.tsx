import { requireRole } from "@/lib/core/server"
import React from "react"

const AdminDashboardPage = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  await requireRole("admin")
  return <div></div>
}

export default AdminDashboardPage
