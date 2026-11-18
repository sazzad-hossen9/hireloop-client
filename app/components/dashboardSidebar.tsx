import { Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

export default function DashboardSidebar() {
  const { data: session } = useSession()
  const role = session?.user?.role || "seeker"
  const menuItemByRole = {
    seeker: [],
    recruiter: [],
    admin: [],
  }
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {
              // menuItemByRole[role].map((item) => (
              //   <SidebarMenuItem key={item.id}>
              //     <SidebarMenuButton href={item.url}>
              //       <item.icon />
              //       <span>{item.name}</span>
              //     </SidebarMenuButton>
              //   </SidebarMenuItem>
              // ))
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
