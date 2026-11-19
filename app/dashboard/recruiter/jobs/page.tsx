import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { DashboardPage } from "@/components/dashboard/page-container"
import { PageHeader } from "@/components/dashboard/page-header"
import { JobsCardList } from "@/components/jobs/jobs-card-list"
import { JobsTable } from "@/components/jobs/jobs-table"
import { Button } from "@/components/ui/button"
import { getJobs } from "@/lib/api/jobs"

export const metadata: Metadata = {
  title: "Manage Job Posts — HireLoop",
}

export default async function ManageJobsPage() {
  const jobs = await getJobs()

  return (
    <DashboardPage width="wide">
      <PageHeader
        breadcrumb={[
          { label: "Manage Jobs" },
          { label: "Job Listings & Postings" },
        ]}
        title="Manage Job Posts"
        description="Review live listings, monitor applicants, and update job details across your organization."
        action={
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/recruiter/jobs/new" />}
            className="h-10 shrink-0 rounded-[12px] px-5 text-sm"
          >
            <Plus className="size-4" />
            New Job Post
          </Button>
        }
      />

      {/* Postings list — table on desktop, cards on mobile */}
      <div className="overflow-hidden rounded-[16px] border border-[#232327] bg-[#151516]">
        <JobsTable jobs={jobs} />
        <JobsCardList jobs={jobs} />
      </div>
    </DashboardPage>
  )
}
