import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

const getSession = async () => {
  "use server"
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

export default getSession

//* token  get
export const getToken = async () => {
  const session = await getSession()
  if (!session || !session?.session?.token) {
    redirect("/unauthorized")
  }
  return session.session.token
}

export const authFetch = () => {}

export const requireRole = async (role: string) => {
  const session = await getSession()
  if (!session || session?.user.role !== role) {
    redirect("/unauthorized")
  }
  return session
}
