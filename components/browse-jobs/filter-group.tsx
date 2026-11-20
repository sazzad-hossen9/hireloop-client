import type { ReactNode } from "react"
import { Check } from "lucide-react"

/** A titled group of filters inside the sidebar card. */
export function FilterGroup({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-base font-semibold text-[#ededef]">
        {title}
      </legend>
      <div className="flex flex-col gap-1">{children}</div>
    </fieldset>
  )
}

type FilterCheckboxProps = {
  /** Query-param name, e.g. `jobType` or `isRemote`. */
  name: string
  value: string
  label: string
  /**
   * Leave both `checked` and `onChange` off for a plain checkbox, or pass both
   * to control it (single-select groups need this).
   */
  checked?: boolean
  onChange?: (checked: boolean) => void
}

/**
 * Square checkbox matching the Figma filter list. It is a native checkbox
 * (`peer`) with a custom box, so keyboard and screen-reader behaviour still
 * come from the browser.
 */
export function FilterCheckbox({
  name,
  value,
  label,
  checked,
  onChange,
}: FilterCheckboxProps) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 py-1">
      <span className="relative flex size-5 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}

          onChange={
            onChange ? (event) => onChange(event.target.checked) : undefined
          }
          className="peer size-5 cursor-pointer appearance-none rounded-[4px] border border-white/10 bg-[#1a1a1f] transition-colors checked:border-white checked:bg-white"
        />
        <Check
          strokeWidth={3}
          className="pointer-events-none absolute size-3.5 text-[#141418] opacity-0 transition-opacity peer-checked:opacity-100"
        />
      </span>
      <span className="text-[13px] font-medium text-[#a0a0ab] transition-colors group-hover:text-[#ededef]">
        {label}
      </span>
    </label>
  )
}
