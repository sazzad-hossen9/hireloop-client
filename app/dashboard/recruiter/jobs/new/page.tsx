import type { Metadata } from "next"

import { NewJobForm } from "./new-job-form"

export const metadata: Metadata = {
  title: "Post a New Job — HireLoop",
}

export default function NewJobsPage() {
  return <NewJobForm />
}
