import type { Metadata } from "next"

import { FilterPanel } from "@/components/browse-jobs/filter-panel"
import { SearchBar } from "@/components/browse-jobs/search-bar"
import { SortSelect } from "@/components/browse-jobs/sort-select"
import { JobCard } from "@/components/jobs/job-card"
import { SiteHeader } from "@/components/site-header"
import { getJobs } from "@/lib/api/jobs"

export const metadata: Metadata = {
  title: "Browse Jobs — HireLoop",
}

type BrowseJobsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/** Repeated params (multi-select filters) must stay repeated in the API call. */
function toQueryString(search: Record<string, string | string[] | undefined>) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(search)) {
    if (!value) continue

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item))
    } else {
      params.set(key, value)
    }
  }

  return params.toString()
}

export default async function BrowseJobsPage({
  searchParams,
}: BrowseJobsPageProps) {
  // Forward the URL query to the API, e.g. ?search=react&jobType=full-time
  const search = await searchParams
  const jobs = await getJobs(toQueryString(search))

  return (
    <div className="flex min-h-svh flex-col bg-[#08080a]">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-10 lg:px-8 lg:py-16">
        <SearchBar />

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[296px_minmax(0,1fr)]">
          <FilterPanel />

          <section
            aria-labelledby="job-results-heading"
            className="flex min-w-0 flex-col gap-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2
                id="job-results-heading"
                className="text-[22px] font-semibold text-[#ededef]"
              >
                Found {jobs.length} Professional{" "}
                {jobs.length === 1 ? "Job" : "Jobs"}
              </h2>

              {/* TODO: pass `onSortChange` once sorting is implemented. */}
              <SortSelect />
            </div>

            {jobs.length > 0 ? (
              <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <p className="rounded-[12px] border border-white/[0.07] bg-[#141418] px-6 py-12 text-center text-sm text-[#a0a0ab]">
                No jobs match these filters yet. Try a different search.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
