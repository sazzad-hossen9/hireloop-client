"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "cn"
import { useRouter, useSearchParams } from "next/navigation"

type SearchBarProps = {
  placeholder?: string
  /**
   * TODO: implement search.
   * The input is named `search` because the jobs API reads `?search=…`.
   */
  onSearch?: (query: string) => void
  className?: string
}

/** Search card from the Figma "Browse Jobs" frame: input + primary button. */
export function SearchBar({
  placeholder = "Search by job title, keywords...",
  className,
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const search = data.search
    // Keep the selected filters when a new search is submitted.
    const params = new URLSearchParams(searchParams.toString())
    params.set("search", search as string)
    router.push(`/browse-jobs?${params.toString()}`)
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "rounded-[12px] border border-white/[0.07] bg-[#141418] p-4 sm:p-6",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-[#8e9192]" />
          <input
            type="search"
            name="search"
            aria-label="Search jobs"
            placeholder={placeholder}
            className="h-[58px] w-full rounded-[8px] border border-white/[0.07] bg-[#1a1a1f] pr-4 pl-11 text-sm text-white transition-colors outline-none placeholder:text-[#a0a0ab] focus-visible:border-white/20 focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        <Button
          type="submit"
          className="h-[58px] shrink-0 rounded-[8px] bg-white px-6 text-base font-semibold text-[#2f3131] hover:bg-white/90 hover:text-[#2f3131]"
        >
          Search Jobs
        </Button>
      </div>
    </form>
  )
}
