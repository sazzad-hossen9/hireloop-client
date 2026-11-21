"use client"

import { Download } from "lucide-react"

/**
 * Triggers the browser print dialog, where the user can "Save as PDF".
 * A dedicated PDF generator can replace the click handler later.
 */
export function ExportPdfButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-[42px] shrink-0 items-center gap-2 rounded-[8px] bg-[#fafafa] px-4 text-[13px] leading-5 font-medium tracking-[-0.005em] text-[#0b0b0c] shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-colors hover:bg-white"
    >
      <Download className="size-3" aria-hidden="true" />
      Export PDF
    </button>
  )
}
