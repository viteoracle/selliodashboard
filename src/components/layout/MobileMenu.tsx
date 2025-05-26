
import { cn } from "@/lib/utils";
import { NavLinks } from "./NavLinks";
import { AuthButtons } from "./AuthButtons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Store, ChevronRight } from "lucide-react";
import type { User as UserType } from "@/services/types/auth.types";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  dashboardLink: string;
  onLogout: () => void;
  user: UserType | null;
}

export const MobileMenu = ({ 
  isOpen, 
  onClose,
  isAuthenticated,
  dashboardLink,
  onLogout,
  user
}: MobileMenuProps) => {
  const getDashboardIcon = () => {
    if (!user) return <User className="h-4 w-4 mr-2" />;
    return user.role === 'seller' ? 
      <Store className="h-4 w-4 mr-2" /> : 
      <User className="h-4 w-4 mr-2" />;
  };

  const getDashboardText = () => {
    if (!user) return 'Dashboard';
    if (user.role === 'seller') {
      return 'Seller Dashboard';
    }
    return user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard';
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 h-full w-3/4 max-w-sm bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &times;
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Main navigation */}
            <div className="space-y-2">
              <NavLinks 
                mobile 
                onNavigate={onClose} 
                className="flex w-full justify-between items-center py-3 border-b border-gray-100"
              />
            </div>
            
            <Separator />
            
            {/* Auth section */}
            <div className="pt-2">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Account</h3>
              {isAuthenticated ? (
                <div className="space-y-3">
                  {user && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">{user.fullName || user.email}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  )}
                  <Link 
                    to={dashboardLink}
                    onClick={onClose}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      {getDashboardIcon()}
                      <span>{getDashboardText()}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <AuthButtons mobile onNavigate={onClose} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
