import { Outlet } from "react-router-dom"
import { AppSidebar } from "../../components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"


export function DefaultLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppSidebar />
        <SidebarTrigger />
        <Outlet />  
      </main>
    </SidebarProvider>
  )
}