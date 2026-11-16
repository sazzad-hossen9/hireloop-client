import { HeroSection } from "@/components/hero-section"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main>
        <HeroSection />
      </main>
    </div>
  )
}
