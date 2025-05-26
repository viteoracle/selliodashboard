import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AdminSidebar } from "../admin/AdminSidebar";
import { AdminFooter } from "../admin/AdminFooter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Folder, User } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  

  if (isAdminRoute) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <div className="flex flex-1 flex-col">
            <div className="flex h-16 items-center border-b px-6 justify-between">
              <div className="flex items-center">
                <SidebarTrigger />
                <span className="ml-4 flex items-center gap-2">
                  <Folder className="h-5 w-5 text-primary" />
                  <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                  <Bell className="h-5 w-5 text-gray-600" />
                </button>
                <div className="flex items-center gap-2 ml-2">
                  <div className="h-8 w-8 rounded-full bg-market-100 flex items-center justify-center text-market-600">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-gray-500">admin@Sellio.com </p>
                  </div>
                </div>
              </div>
            </div>
            <main className="flex-1 p-6">{children}</main>
            <AdminFooter />
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
