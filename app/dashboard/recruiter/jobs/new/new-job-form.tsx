"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  MapPin,
  Wifi,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { createJobs } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
]

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product",
  "Marketing",
  "Sales & Business",
  "Finance & Accounting",
  "Customer Support",
  "Operations",
  "Human Resources",
  "Healthcare",
  "Education",
  "Other",
]

const FREQUENCIES = ["per hour", "per day", "per month", "per year"]

/** Shared styling, pulled from the Figma form spec (44px, #1e1e21, radius 12). */
const fieldClass =
  "h-11 rounded-[12px] border-0 bg-[#1e1e21] px-4 text-sm text-white placeholder:text-[#6b6b70] focus-visible:ring-2 focus-visible:ring-ring/40 dark:bg-[#1e1e21]"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[16px] bg-[#151516] p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="size-2 rounded-full bg-primary" />
        <h2 className="text-base font-medium text-white">{title}</h2>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}

function RequiredMark() {
  return <span className="text-primary">*</span>
}

export function NewJobForm() {
  const [collected, setCollected] = React.useState<Record<
    string,
    string
  > | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // One line to read every named input into a plain object.
    const data = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as Record<string, string>

    // TODO: send `data` to your API / MongoDB when the backend is ready.
    console.log("[new job] form data:", data)
    setCollected(data)
    const result = await createJobs(data)
    if (result.acknowledged === true) {
      console.log("asdfghjkl")
      toast.add({
        type: "success",
        description: "create  new jobs ",
      })
    }
  }

  return (
    <div className="min-h-svh w-full bg-[#131314] px-4 py-6 lg:px-10 lg:py-10">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-5xl flex-col gap-6"
      >
        {/* Breadcrumb + page heading + publish action */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-xs font-medium">
              <Link
                href="/dashboard/recruiter/jobs"
                className="text-[#a0a0ab] transition-colors hover:text-white"
              >
                Manage Jobs
              </Link>
              <ChevronRight className="size-3 text-[#5a5a60]" />
              <span className="text-[#c3c0ff]">Create New Listing</span>
            </div>
            <h1 className="font-heading text-[32px] leading-tight font-medium text-white">
              Post a New Job
            </h1>
            <p className="text-[13px] text-[#a0a0ab]">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>
        </div>

        {collected && (
          <p
            role="status"
            className="rounded-[12px] border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-[#c3c0ff]"
          >
            <span className="font-medium">{collected.jobTitle}</span> captured.
            The full object is in your browser console — connect it to your API
            next.
          </p>
        )}

        {/* 1. Basic Information */}
        <Section title="1. Basic Information">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="jobTitle"
              className="text-sm font-medium text-[#f4f4f5]"
            >
              Job Title <RequiredMark />
            </Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              placeholder="e.g. Frontend Developer"
              className={fieldClass}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="companyName"
                className="text-sm font-medium text-[#f4f4f5]"
              >
                Company Name <RequiredMark />
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="e.g. HirePulse Network"
                className={fieldClass}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="jobCategory"
                className="text-sm font-medium text-[#f4f4f5]"
              >
                Job Category <RequiredMark />
              </Label>
              <div className="relative">
                <select
                  id="jobCategory"
                  name="jobCategory"
                  defaultValue=""
                  className={cn(fieldClass, "w-full appearance-none pr-10")}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {JOB_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-[#f4f4f5]">
              Job Type <RequiredMark />
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {JOB_TYPES.map((type, index) => (
                <label
                  key={type.value}
                  className="flex h-11 cursor-pointer items-center justify-center rounded-[12px] bg-[#1e1e21] text-sm text-[#a0a0ab] transition-colors has-checked:bg-[#232327] has-checked:text-white has-checked:shadow-[inset_0_0_0_1px_rgba(92,83,254,0.5)]"
                >
                  <input
                    type="radio"
                    name="jobType"
                    value={type.value}
                    defaultChecked={index === 0}
                    className="sr-only"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>
        </Section>

        {/* 2. Location, Compensation & Timeline */}
        <Section title="2. Location, Compensation & Timeline">
          <div className="flex items-center justify-between gap-4 rounded-[12px] border border-[#232327] bg-[#1e1e21] p-3">
            <div className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                <Wifi className="size-4 text-[#c3c0ff]" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">
                  Remote Work Allowed
                </p>
                <p className="text-[13px] text-[#a0a0ab]">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>
            <Switch
              name="isRemote"
              value="yes"
              aria-label="Remote work allowed"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="location"
                  className="text-sm font-medium text-[#f4f4f5]"
                >
                  Job Location <RequiredMark />
                </Label>
                <span className="text-xs font-medium text-[#5a5a60]">
                  Required
                </span>
              </div>
              <div className="relative">
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. New York, USA"
                  className={cn(fieldClass, "pr-10")}
                  required
                />
                <MapPin className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="deadline"
                className="text-sm font-medium text-[#f4f4f5]"
              >
                Application Deadline
              </Label>
              <div className="relative">
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  className={cn(fieldClass, "pr-10 [color-scheme:dark]")}
                />
                <CalendarDays className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="minSalary"
                className="text-sm font-medium text-[#f4f4f5]"
              >
                Min Salary / Rate
              </Label>
              <Input
                id="minSalary"
                name="minSalary"
                type="number"
                min={0}
                placeholder="25"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="maxSalary"
                className="text-sm font-medium text-[#f4f4f5]"
              >
                Max Salary / Rate
              </Label>
              <Input
                id="maxSalary"
                name="maxSalary"
                type="number"
                min={0}
                placeholder="40"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="frequency"
                className="text-sm font-medium text-[#f4f4f5]"
              >
                Frequency
              </Label>
              <div className="relative">
                <select
                  id="frequency"
                  name="frequency"
                  defaultValue="per hour"
                  className={cn(fieldClass, "w-full appearance-none pr-10")}
                >
                  {FREQUENCIES.map((frequency) => (
                    <option key={frequency} value={frequency}>
                      {frequency}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Responsibilities & Requirements */}
        <Section title="3. Responsibilities & Requirements">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="responsibilities"
              className="text-sm font-medium text-[#f4f4f5]"
            >
              Key Responsibilities <RequiredMark />
            </Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              rows={4}
              placeholder="Describe what this person will own day to day…"
              className="min-h-[98px] resize-y rounded-[12px] border-0 bg-[#1e1e21] px-4 py-4 text-sm text-white placeholder:text-[#6b6b70] focus-visible:ring-2 focus-visible:ring-ring/40 dark:bg-[#1e1e21]"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="requirements"
              className="text-sm font-medium text-[#f4f4f5]"
            >
              Qualifications & Requirements <RequiredMark />
            </Label>
            <Textarea
              id="requirements"
              name="requirements"
              rows={4}
              placeholder="List the experience, skills and qualifications you need…"
              className="min-h-[98px] resize-y rounded-[12px] border-0 bg-[#1e1e21] px-4 py-4 text-sm text-white placeholder:text-[#6b6b70] focus-visible:ring-2 focus-visible:ring-ring/40 dark:bg-[#1e1e21]"
              required
            />
          </div>
        </Section>

        <div className="flex justify-end pb-4">
          <Button type="submit" className="h-11 rounded-[12px] px-6 text-sm">
            Publish Job
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
