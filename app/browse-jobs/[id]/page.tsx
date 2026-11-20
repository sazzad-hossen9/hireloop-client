import React from "react"

const JobDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  console.log("id", id)
  return <div>job deteals page</div>
}

export default JobDetailsPage
