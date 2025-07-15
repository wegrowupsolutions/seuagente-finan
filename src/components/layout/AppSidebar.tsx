import { useState } from "react"
import { 
  Home, 
  Users, 
  Package, 
  Network, 
  ShoppingCart, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  UserCheck, 
  Puzzle, 
  HelpCircle 
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Membros", url: "/membros", icon: Users },
  { title: "Produtos", url: "/produtos", icon: Package },
  { title: "Afiliados", url: "/afiliados", icon: Network },
  { title: "Vendas", url: "/vendas", icon: ShoppingCart },
  { title: "Assinaturas", url: "/assinaturas", icon: Calendar },
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Colaboradores", url: "/colaboradores", icon: UserCheck },
  { title: "Apps", url: "/apps", icon: Puzzle },
  { title: "Apoio", url: "https://seuagente.ai/help", icon: HelpCircle, external: true },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/"
    return currentPath.startsWith(path)
  }

  const getNavClasses = (path: string) => {
    const active = isActive(path)
    return active 
      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-elegant" 
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
  }

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-sidebar border-sidebar-border`}>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.external ? (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${getNavClasses(item.url)}`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                      </a>
                    ) : (
                      <NavLink 
                        to={item.url} 
                        end={item.url === "/"}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${getNavClasses(item.url)}`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                      </NavLink>
                    )}
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