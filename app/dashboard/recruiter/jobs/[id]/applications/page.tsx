import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { ApplicationStats } from "@/components/applications/application-stats"
import { RecruiterApplicationsTable } from "@/components/applications/recruiter-applications-table"
import { DashboardPage } from "@/components/dashboard/page-container"
import { PageHeader } from "@/components/dashboard/page-header"
import { getApplications } from "@/lib/api/applications"
import { getJobById } from "@/lib/api/jobs"
import getSession from "@/lib/core/server"

export const metadata: Metadata = {
  title: "Job Applications — HireLoop",
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function RecruiterJobApplicationsPage({
  params,
}: PageProps) {
  const session = await getSession()

  if (!session?.user) redirect("/login")
  if (session.user.role !== "recruiter") redirect("/dashboard")

  const { id } = await params
  const [job, applications] = await Promise.all([
    getJobById(id),
    getApplications({ jobId: id }),
  ])

  if (!job) notFound()

  return (
    <DashboardPage width="wide">
      <PageHeader
        breadcrumb={[
          { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
          { label: job.jobTitle },
          { label: "Applications" },
        ]}
        title="Applications"
        description={`Review applicants for ${job.jobTitle} at ${job.companyName}.`}
      />

      <ApplicationStats applications={applications} />

      <section
        aria-label={`Applicants for ${job.jobTitle}`}
        className="rounded-[14px] border border-[#232327] bg-[#141418] p-2 sm:p-3"
      >
        <RecruiterApplicationsTable applications={applications} />
      </section>
    </DashboardPage>
  )
}
