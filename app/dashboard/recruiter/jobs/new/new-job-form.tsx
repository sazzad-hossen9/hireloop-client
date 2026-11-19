"use client"

import * as React from "react"
import { ArrowUpRight, CalendarDays, MapPin, Wifi } from "lucide-react"

import {
  FormField,
  SelectField,
  fieldClassName,
  textareaClassName,
} from "@/components/dashboard/form-field"
import { DashboardPage } from "@/components/dashboard/page-container"
import { PageHeader } from "@/components/dashboard/page-header"
import { SectionCard } from "@/components/dashboard/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { createJobs } from "@/lib/actions/jobs"
import { FREQUENCIES, JOB_CATEGORIES, JOB_TYPES } from "@/lib/jobs/options"
import { cn } from "cn"

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
      toast.add({
        type: "success",
        description: "create  new jobs ",
      })
    }
  }

  return (
    <DashboardPage as="form" onSubmit={handleSubmit}>
      <PageHeader
        breadcrumb={[
          { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
          { label: "Create New Listing" },
        ]}
        title="Post a New Job"
        description="Fill in the position specifications to attract qualified talent across our network."
      />

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
      <SectionCard title="1. Basic Information">
        <FormField label="Job Title" htmlFor="jobTitle" required>
          <Input
            id="jobTitle"
            name="jobTitle"
            placeholder="e.g. Frontend Developer"
            className={fieldClassName}
            required
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Company Name" htmlFor="companyName" required>
            <Input
              id="companyName"
              name="companyName"
              placeholder="e.g. HirePulse Network"
              className={fieldClassName}
              required
            />
          </FormField>

          <SelectField
            id="jobCategory"
            name="jobCategory"
            label="Job Category"
            options={JOB_CATEGORIES}
            placeholder="Select a category"
            required
          />
        </div>

        <FormField label="Job Type" required>
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
        </FormField>
      </SectionCard>

      {/* 2. Location, Compensation & Timeline */}
      <SectionCard title="2. Location, Compensation & Timeline">
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
          <FormField
            label="Job Location"
            htmlFor="location"
            required
            hint="Required"
          >
            <div className="relative">
              <Input
                id="location"
                name="location"
                placeholder="e.g. New York, USA"
                className={cn(fieldClassName, "pr-10")}
                required
              />
              <MapPin className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
            </div>
          </FormField>

          <FormField label="Application Deadline" htmlFor="deadline">
            <div className="relative">
              <Input
                id="deadline"
                name="deadline"
                type="date"
                className={cn(fieldClassName, "pr-10 [color-scheme:dark]")}
              />
              <CalendarDays className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
            </div>
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField label="Min Salary / Rate" htmlFor="minSalary">
            <Input
              id="minSalary"
              name="minSalary"
              type="number"
              min={0}
              placeholder="25"
              className={fieldClassName}
            />
          </FormField>

          <FormField label="Max Salary / Rate" htmlFor="maxSalary">
            <Input
              id="maxSalary"
              name="maxSalary"
              type="number"
              min={0}
              placeholder="40"
              className={fieldClassName}
            />
          </FormField>

          <SelectField
            id="frequency"
            name="frequency"
            label="Frequency"
            options={FREQUENCIES}
            defaultValue="per hour"
          />
        </div>
      </SectionCard>

      {/* 3. Responsibilities & Requirements */}
      <SectionCard title="3. Responsibilities & Requirements">
        <FormField
          label="Key Responsibilities"
          htmlFor="responsibilities"
          required
        >
          <Textarea
            id="responsibilities"
            name="responsibilities"
            rows={4}
            placeholder="Describe what this person will own day to day…"
            className={textareaClassName}
            required
          />
        </FormField>

        <FormField
          label="Qualifications & Requirements"
          htmlFor="requirements"
          required
        >
          <Textarea
            id="requirements"
            name="requirements"
            rows={4}
            placeholder="List the experience, skills and qualifications you need…"
            className={textareaClassName}
            required
          />
        </FormField>
      </SectionCard>

      <div className="flex justify-end pb-4">
        <Button type="submit" className="h-11 rounded-[12px] px-6 text-sm">
          Publish Job
          <ArrowUpRight className="size-4" />
        </Button>
      </div>
    </DashboardPage>
  )
}
