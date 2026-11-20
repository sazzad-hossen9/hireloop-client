"use client"
import { useSession } from "@/lib/auth-client"
import { cn } from "cn"
import { useRouter } from "next/navigation"

const ApplyNow = ({ expired,id }: { expired: boolean,id:string }) => {
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()
  const handleApplyNow = () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${id}`)
    }
    
  }
  return (
    <div>
      <button
        onClick={handleApplyNow}
        type="button"
        disabled={expired}
        className={cn(
          "inline-flex h-12 min-w-[115px] items-center justify-center rounded-[8px] px-4 text-[15px] font-medium transition-colors",
          expired
            ? "cursor-not-allowed bg-white/10 text-[#8e9192]"
            : "bg-[#fafafa] text-[#0b0b0c] hover:bg-white/90"
        )}
      >
        {expired ? "Closed" : "Apply Now"}
      </button>
    </div>
  )
}

export default ApplyNow
