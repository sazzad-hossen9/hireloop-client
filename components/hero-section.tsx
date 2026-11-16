import Image from "next/image"
import { Briefcase, MapPin, Search } from "lucide-react"

import globe from "@/app/images/globe.png"

const TRENDING_POSITIONS = [
  "Product Designer",
  "AI Engineering",
  "DevOps Engineer",
]

/**
 * Home hero following the HireLoop Figma design:
 * - Rainbow conic-gradient bordered badge pill with gradient side lines,
 *   "50,000+ new jobs this month" (Space Mono).
 * - Manrope bold 56px title + 20px subtitle, centered.
 * - Search bar (#101010, border white/20%, r16) with keyword + location
 *   inputs and a violet 48px submit button.
 * - "Trending Position" chips (bg #1a1a1b, border white/10%, pill).
 * - Backdrop: planet/globe image + blurred violet glow (page bg #010103).
 */
export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Backdrop */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={globe}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="absolute -top-48 left-1/2 h-[640px] w-[900px] max-w-none -translate-x-1/2 rounded-full bg-[#5c53fe]/25 blur-[160px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto flex max-w-[784px] flex-col items-center gap-8 px-4 pt-14 pb-24 md:pt-24 md:pb-32">
        {/* Badge pill */}
        <div className="rounded-[24px] bg-[conic-gradient(from_0deg,#ff00ff_0%,#0000ff_14%,#00ffff_28%,#00ff00_42%,#ffff00_56%,#ffbf00_70%,#ff0000_84%,#ff00ff_100%)] p-px">
          <div className="flex items-center gap-6 rounded-[23px] bg-gradient-to-r from-[#474747] to-[#010102] px-3 py-2.5">
            <span
              aria-hidden="true"
              className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#a8a8a8]/70 sm:block"
            />
            <span className="flex items-center gap-4 px-2 sm:px-4">
              <Briefcase className="size-6 shrink-0 text-white" aria-hidden="true" />
              <span className="font-badge text-base text-white md:text-xl">
                50,000+ new jobs this month
              </span>
            </span>
            <span
              aria-hidden="true"
              className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#a8a8a8]/70 sm:block"
            />
          </div>
        </div>

        {/* Title + subtitle */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-[56px] md:leading-[1.15]">
            Find Your Dream Job Today
          </h1>
          <p className="font-heading max-w-2xl text-lg text-white md:text-xl">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role —
            faster.
          </p>
        </div>

        {/* Search bar */}
        <form
          action="/"
          className="flex w-full items-center gap-2 rounded-[16px] border border-white/20 bg-[#101010] p-2 pl-4 md:gap-3 md:pl-6"
        >
          <Search className="size-6 shrink-0 text-white" aria-hidden="true" />
          <input
            type="search"
            name="q"
            placeholder="Job title, skill or company"
            aria-label="Search jobs by title, skill or company"
            className="h-12 min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/60"
          />
          <div
            aria-hidden="true"
            className="hidden h-6 w-px shrink-0 bg-white/20 lg:block"
          />
          <div className="hidden min-w-0 items-center gap-2 lg:flex lg:w-52">
            <MapPin className="size-6 shrink-0 text-white" aria-hidden="true" />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              aria-label="Filter by location or remote"
              className="h-12 w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-white/60"
            />
          </div>
          <button
            type="submit"
            aria-label="Search jobs"
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-[0_2px_4px_rgba(0,0,0,0.25)] transition-colors hover:bg-primary/90"
          >
            <Search className="size-6" aria-hidden="true" />
          </button>
        </form>

        {/* Trending positions */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <span className="font-heading text-base text-white">
            Trending Position
          </span>
          {TRENDING_POSITIONS.map((position) => (
            <a
              key={position}
              href="#"
              className="font-heading rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 text-sm text-white transition-colors hover:border-white/25"
            >
              {position}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
