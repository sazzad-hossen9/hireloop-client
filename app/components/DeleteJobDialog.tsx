"use client"
import { Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { JobPost } from "@/lib/jobs/types"
import { deleteJobs } from "@/lib/actions/jobs"
import { useState } from "react"

interface DeleteJobsDialogProps {
  jobs: JobPost
}
export function DeleteJobsDialog({ jobs }: DeleteJobsDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleDelete = async () => {
    const res = await deleteJobs(jobs._id)
    console.log(res)
    if (res.deletedCount) {
      setOpen(false)
      router.refresh()
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive">
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>delete jobs </AlertDialogTitle>
          <AlertDialogDescription>
            {" "}
            This will permanently delete this chat conversation. View{" "}
            <a href="#">Settings</a> delete any memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
