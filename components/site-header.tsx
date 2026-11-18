"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authClient, useSession } from "@/lib/auth-client"
import { signOut } from "better-auth/api"

const NAV_LINKS = [
  { label: "Browse Jobs", href: "#browse-jobs", active: true },
  { label: "Company", href: "#company", active: false },
  { label: "Pricing", href: "#pricing", active: false },
]

/**
 * Site navbar following the HireLoop Figma design:
 * - Desktop: dark header bar (#141418, r14) with the logo on the left and a
 *   nav cluster (#1a1a1f, r8) on the right containing links, a vertical
 *   divider, and Sign In / Get Started buttons.
 * - Mobile: logo + hamburger; the dropdown panel mirrors the "HL/Menu"
 *   component (#1e1e21, r12, border #33333a, items with white/4-6% fills).
 */

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  const { data: session } = useSession()
  console.log("user ", session)
  const handleSignOut = async () => {
    await authClient.signOut()
  }

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 rounded-[14px] border bg-background px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_2px_rgba(0,0,0,0.6)]">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-7 w-auto md:h-11"
          />
        </Link>

        {/* Desktop nav cluster */}
        <nav
          aria-label="Main navigation"
          className="hidden h-[52px] items-center gap-6 rounded-lg border bg-card pr-2 pl-6 md:flex"
        >
          <ul className="flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={cn(
                    "text-base transition-colors hover:text-foreground/70",
                    link.active && "font-semibold text-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div aria-hidden="true" className="h-6 w-px bg-[#a8a8a8]/40" />

          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <span>{session?.user?.name}</span>

                <Button
                  onClick={handleSignOut}
                  className="h-9 rounded-[8px] px-4 text-[15px]"
                >
                  signOut
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Button className="h-9 rounded-[8px] bg-white px-4 text-[15px] font-semibold text-[#645bff] shadow-[0_2px_4px_rgba(0,0,0,0.25)] hover:bg-white/90 hover:text-[#645bff]">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button className="h-9 rounded-[8px] px-4 text-[15px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile: hamburger + dropdown menu */}
        <div className="relative md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="size-11 rounded-lg border bg-card text-foreground hover:bg-card/80 hover:text-foreground"
          >
            {open ? <X /> : <Menu />}
          </Button>

          {open && (
            <div
              id="site-mobile-nav"
              className="absolute top-[calc(100%+0.5rem)] right-0 flex w-64 flex-col gap-0.5 rounded-[12px] border border-[#33333a] bg-popover p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.6)]"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center rounded-md px-2.5 py-2.5 text-sm transition-colors",
                    link.active
                      ? "bg-white/[0.04] font-medium text-foreground"
                      : "text-[#d4d4d8] hover:bg-white/[0.06] hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}

              <div aria-hidden="true" className="my-1 h-px bg-white/10" />

              <div className="flex flex-col gap-2 p-1.5">
                <Button className="rounded-lg bg-white font-semibold text-[#645bff] hover:bg-white/90 hover:text-[#645bff]">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button className="rounded-lg font-medium">Get Started</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
