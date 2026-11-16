"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"

type AuthMode = "signin" | "signup"

const TABS: Array<{ mode: AuthMode; label: string; href: string }> = [
  { mode: "signin", label: "Sign In", href: "/sign-in" },
  { mode: "signup", label: "Sign Up", href: "/sign-up" },
]

/**
 * Shared auth form for the Sign In / Sign Up pages.
 * The tab row toggles between the two pages (URL-based), and the submit
 * handler currently only collects the form data — API integration comes later.
 */
export function AuthForm({ mode }: { mode: AuthMode }) {
  const isSignIn = mode === "signin"

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    console.log("sdfghjk",data)
    if (isSignIn) {
      const { data: fromData, error } = await authClient.signIn.email({
        email: data.email as string,
        password: data.password as string,
        callbackURL: "/",
      })
      console.log("sign in page ", fromData, error)
    } else {
      const { data: signUpData, error } = await authClient.signUp.email({
        name: data.fullName as string,
        email: data.email as string,
        password: data.password as string,
        callbackURL: "/",
      })
      console.log("sign uo data ", signUpData, error)
    }
  }

  return (
    <div className="w-full max-w-md rounded-[12px] border bg-[#141418] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
      {/* Toggle between Sign In / Sign Up */}
      <div
        role="tablist"
        aria-label="Authentication"
        className="mb-6 grid grid-cols-2 gap-1 rounded-lg border bg-[#1a1a1f] p-1"
      >
        {TABS.map((tab) => (
          <Link
            key={tab.mode}
            role="tab"
            aria-selected={mode === tab.mode}
            href={tab.href}
            className={cn(
              "flex h-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
              mode === tab.mode
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-1 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          {isSignIn ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSignIn
            ? "Sign in to continue your job hunt."
            : "Start finding your next role on HireLoop."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        noValidate={false}
      >
        {!isSignIn && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              required
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane.doe@example.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignIn ? "current-password" : "new-password"}
            placeholder="••••••••"
            minLength={8}
            required
          />
          {isSignIn && (
            <div className="flex justify-end">
              <a
                href="#"
                className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                Forgot password?
              </a>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="mt-2 h-11 w-full rounded-lg text-[15px]"
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isSignIn ? (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-foreground hover:underline"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-foreground hover:underline"
            >
              Sign In
            </Link>
          </>
        )}
      </p>
    </div>
  )
}
