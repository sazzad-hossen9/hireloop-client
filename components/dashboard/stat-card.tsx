import { cn } from "cn"

type StatCardProps = {
  label: string
  value: number | string
  /** Optional accent for the value, e.g. a success or warning colour. */
  valueClassName?: string
}

/** The 86px metric tile shared by dashboard list pages. */
export function StatCard({ label, value, valueClassName }: StatCardProps) {
  return (
    <div className="flex h-[86px] flex-col justify-center gap-2 rounded-[12px] border border-white/[0.07] bg-[#141418] px-6 shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]">
      <p className="text-[13px] leading-5 tracking-[-0.005em] text-[#a0a0ab]">
        {label}
      </p>
      <p
        className={cn(
          "text-[26px] leading-8 font-semibold tracking-[-0.02em] text-[#ededef]",
          valueClassName
        )}
      >
        {value}
      </p>
    </div>
  )
}
