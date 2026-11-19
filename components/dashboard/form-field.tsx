"use client"

import type { ReactNode } from "react"
import { ChevronDown } from "lucide-react"

import { Label } from "@/components/ui/label"
import { cn } from "cn"

/** Shared styling, pulled from the Figma form spec (44px, #1e1e21, radius 12). */
export const fieldClassName =
  "h-11 rounded-[12px] border-0 bg-[#1e1e21] px-4 text-sm text-white placeholder:text-[#6b6b70] focus-visible:ring-2 focus-visible:ring-ring/40 dark:bg-[#1e1e21]"

/** Same surface as `fieldClassName`, sized for multi-line text. */
export const textareaClassName =
  "min-h-[98px] resize-y rounded-[12px] border-0 bg-[#1e1e21] px-4 py-4 text-sm text-white placeholder:text-[#6b6b70] focus-visible:ring-2 focus-visible:ring-ring/40 dark:bg-[#1e1e21]"

type FormFieldProps = {
  label: string
  htmlFor?: string
  required?: boolean
  /** Small right-aligned note next to the label, e.g. "Required". */
  hint?: string
  className?: string
  children: ReactNode
}

/** Label row + a single input/textarea/select, with consistent spacing. */
export function FormField({
  label,
  htmlFor,
  required,
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor} className="text-sm font-medium text-[#f4f4f5]">
          {label} {required && <span className="text-primary">*</span>}
        </Label>
        {hint && (
          <span className="text-xs font-medium text-[#5a5a60]">{hint}</span>
        )}
      </div>
      {children}
    </div>
  )
}

type SelectFieldProps = {
  id: string
  name: string
  label: string
  /** Plain option strings. */
  options: readonly string[]
  /** When set, renders a disabled first option (e.g. "Select a category"). */
  placeholder?: string
  defaultValue?: string
  required?: boolean
  hint?: string
}

/** Native `<select>` wearing the form's dark field styling. */
export function SelectField({
  id,
  name,
  label,
  options,
  placeholder,
  defaultValue = "",
  required,
  hint,
}: SelectFieldProps) {
  return (
    <FormField label={label} htmlFor={id} required={required} hint={hint}>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue={defaultValue}
          className={cn(fieldClassName, "w-full appearance-none pr-10")}
          required={required}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
      </div>
    </FormField>
  )
}
