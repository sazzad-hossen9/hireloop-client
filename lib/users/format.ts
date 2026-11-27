/** `"Jane Doe"` → `"JD"`; used when a user has no profile image. */
export function getUserInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "?"
  )
}

/** ISO timestamp → `"Nov 28, 2026"`, with a dash for missing/invalid dates. */
export function formatJoinedAt(value: string | null | undefined) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
