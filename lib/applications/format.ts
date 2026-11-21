const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY

/**
 * `"2026-11-21T10:00:00.000Z"` → `"2 hours ago"`.
 *
 * Matches the relative labels used in the Figma table ("2 hours ago",
 * "1 day ago", "1 week ago"). Invalid dates return an em dash.
 */
export function formatRelativeTime(value: string, now = Date.now()) {
  const timestamp = new Date(value).getTime()

  if (Number.isNaN(timestamp)) return "—"

  // Clamp future timestamps so a clock skew never renders "-1 hours ago".
  const diff = Math.max(0, now - timestamp)

  if (diff < MINUTE) return "just now"

  if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE)
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  }

  if (diff < DAY) {
    const hours = Math.floor(diff / HOUR)
    return `${hours} hour${hours === 1 ? "" : "s"} ago`
  }

  if (diff < WEEK) {
    const days = Math.floor(diff / DAY)
    return `${days} day${days === 1 ? "" : "s"} ago`
  }

  if (diff < MONTH) {
    const weeks = Math.floor(diff / WEEK)
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`
  }

  if (diff < YEAR) {
    const months = Math.floor(diff / MONTH)
    return `${months} month${months === 1 ? "" : "s"} ago`
  }

  const years = Math.floor(diff / YEAR)
  return `${years} year${years === 1 ? "" : "s"} ago`
}
