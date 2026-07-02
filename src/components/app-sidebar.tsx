import { BookIcon, CalendarBlankIcon, HouseIcon, NotePencilIcon,  } from "@phosphor-icons/react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar" 
import { Separator } from "../components/ui/separator"
import { Link } from "react-router-dom"


const items = [
    { to: "/", icon: HouseIcon, title: "Dashboard" },
    { to: "/agenda", icon: CalendarBlankIcon, title: "Agenda" },
    { to: "/formulario", icon: NotePencilIcon, title: "Formulário" },
    { to: "/lembrete", icon: BookIcon, title: "Lembrete" },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-zinc-900 text-white ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-2xl">TattoManager</SidebarGroupLabel>
          <Separator className="my-3" />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}