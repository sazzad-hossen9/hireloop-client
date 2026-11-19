import { getJobs } from "@/lib/api/jobs"
import React from "react"

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const queryString = new URLSearchParams(search as Record<string, string>)
  const query = queryString.toString()
  const jobs = await getJobs(query)
  console.log("search  params : ", query)
  return (
    <div>
      <h2>search params</h2>
      <div>
        {jobs.map((job) => (
          <h2 key={job._id}>{job.jobTitle}</h2>
        ))}
      </div>
    </div>
  )
}

export default BrowseJobsPage
