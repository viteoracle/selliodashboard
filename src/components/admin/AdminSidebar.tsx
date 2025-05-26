
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  FileText,
  LogOut,
  BarChart3,
  ShoppingCart,
  Bell,
  FolderTree,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    group: "Overview",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },
      {
        title: "Products",
        icon: Package,
        path: "/admin/products",
      },
      {
        title: "Orders",
        icon: ShoppingCart,
        path: "/admin/orders",
      },
      {
        title: "Categories",
        path: "/admin/categories",
        icon: FolderTree
      },
      {
        title: "Users",
        icon: Users,
        path: "/admin/users",
      },
      {
        title: "Analytics",
        icon: BarChart3,
        path: "/admin/analytics",
      },
    ],
  },
  // {
  //   group: "System",
  //   items: [
  //     {
  //       title: "File Manager",
  //       icon: FileText,
  //       path: "/admin/files",
  //     },
  //     {
  //       title: "Notifications",
  //       icon: Bell,
  //       path: "/admin/notifications",
  //     },
  //     {
  //       title: "Help & Support",
  //       icon: HelpCircle,
  //       path: "/admin/support",
  //     },
  //     {
  //       title: "Settings",
  //       icon: Settings,
  //       path: "/admin/settings",
  //     },
  //   ],
  // },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <Link to="/admin/dashboard" className="flex items-center gap-2 px-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Package className="h-6 w-6" />
          </div>
          <span className="text-xl font-semibold">Sellio</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={location.pathname === item.path}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link to="/login">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
