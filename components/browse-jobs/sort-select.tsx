"use client"

import { ChevronDown } from "lucide-react"

import { cn } from "cn"

export type SortOption = {
  value: string
  label: string
}

/** Placeholder options — implement the ordering you need. */
export const SORT_OPTIONS: SortOption[] = [
  { value: "recent", label: "Most Recent" },
  { value: "salary-desc", label: "Salary: High to Low" },
  { value: "salary-asc", label: "Salary: Low to High" },
  { value: "deadline", label: "Deadline: Soonest" },
]

type SortSelectProps = {
  /** TODO: implement sorting. */
  onSortChange?: (value: string) => void
  options?: SortOption[]
  defaultValue?: string
  className?: string
}

/** "Sort by:" label + dark select from the Figma results header. */
export function SortSelect({
  onSortChange,
  options = SORT_OPTIONS,
  defaultValue = "recent",
  className,
}: SortSelectProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 text-[13px] font-medium text-[#6e6e78]",
        className
      )}
    >
      Sort by:
      <span className="relative">
        <select
          name="sort"
          defaultValue={defaultValue}
          onChange={(event) => onSortChange?.(event.target.value)}
          className="h-9 appearance-none rounded-[8px] border border-white/10 bg-[#0c0c0f] pr-9 pl-3 text-[13px] font-medium text-[#ededef] transition-colors outline-none focus-visible:border-white/25"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#a1a4aa]" />
      </span>
    </label>
  )
}
