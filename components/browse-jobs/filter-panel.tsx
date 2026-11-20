"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  FilterCheckbox,
  FilterGroup,
} from "@/components/browse-jobs/filter-group"
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/jobs/options"
import { cn } from "cn"

type FilterPanelProps = {
  className?: string
}

/**
 * Single-select checkbox filters: each section keeps exactly one option active
 * (clicking another replaces it, clicking the active one clears it). Sections
 * still combine, e.g. `?jobType=full-time&jobCategory=Product&isRemote=true`.
 *
 * The URL is the single source of truth, so selections survive refreshes and
 * back/forward navigation.
 */
export function FilterPanel({ className }: FilterPanelProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedJobType = searchParams.get("jobType") ?? ""
  const selectedCategory = searchParams.get("jobCategory") ?? ""
  const remoteOnly = searchParams.get("isRemote") === "true"

  /** Set (or remove, when `value` is null) one param while keeping `search`. */
  function setParam(name: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  /** One option per section: checking a value replaces the previous one. */
  function selectOne(name: string, value: string, checked: boolean) {
    setParam(name, checked ? value : null)
  }

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className={cn(
        "flex h-fit flex-col gap-6 rounded-[12px] border border-white/[0.07] bg-[#141418] p-6",
        className
      )}
    >
      <h2 className="text-[22px] font-semibold text-[#ededef]">Filters</h2>

      <FilterGroup title="Job Type">
        {JOB_TYPES.map((type) => (
          <FilterCheckbox
            key={type.value}
            name="jobType"
            value={type.value}
            label={type.label}
            checked={selectedJobType === type.value}
            onChange={(checked) => selectOne("jobType", type.value, checked)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Job Category">
        {JOB_CATEGORIES.map((category) => (
          <FilterCheckbox
            key={category}
            name="jobCategory"
            value={category}
            label={category}
            checked={selectedCategory === category}
            onChange={(checked) => selectOne("jobCategory", category, checked)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Work Setup">
        <FilterCheckbox
          name="isRemote"
          value="true"
          label="Remote only"
          checked={remoteOnly}
          onChange={(checked) => setParam("isRemote", checked ? "true" : null)}
        />
      </FilterGroup>
    </form>
  )
}
