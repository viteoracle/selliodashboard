
import { Menu, User, Store, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/services/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { CartButton } from "./CartButton";
import { AuthButtons } from "./AuthButtons";
import { MobileMenu } from "./MobileMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();

  const getDashboardLink = () => {
    if (!user?.role) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'seller':
        return '/seller/dashboard';
      default:
        return '/customer/dashboard';
    }
  };

  const renderDashboardButton = () => {
    if (!user) return null;

    let icon = <User className="h-4 w-4 mr-2" />;
    let text = 'Dashboard';

    if (user.role === 'seller') {
      icon = <Store className="h-4 w-4 mr-2" />;
      text = 'Seller Dashboard';
    } else if (user.role === 'admin') {
      text = 'Admin Dashboard';
    }

    return (
      <Link to={getDashboardLink()}>
        <Button variant="outline" size="sm" className="flex items-center">
          {icon}
          {text}
        </Button>
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            
            {/* Search bar for desktop */}
            <div className="hidden lg:flex ml-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-market-600 focus:border-market-600"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li>
                        <NavigationMenuLink
                          asChild
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <Link to="/products">
                            <div className="text-sm font-medium leading-none">All Products</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Browse our complete collection
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          asChild
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <Link to="/categories">
                            <div className="text-sm font-medium leading-none">Categories</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Shop by product categories
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/contact"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search button for mobile */}
            <button className="md:hidden focus:outline-none">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            
            <CartButton />
            
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  {renderDashboardButton()}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <AuthButtons />
              )}
            </div>
            
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Search bar for smaller devices - shown below the main navbar */}
        <div className="py-2 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-market-600 focus:border-market-600"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)}
          isAuthenticated={isAuthenticated}
          dashboardLink={getDashboardLink()}
          onLogout={logout}
          user={user}
        />
      </div>
    </nav>
  );
};

export default Navbar;
