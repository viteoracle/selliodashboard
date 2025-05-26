
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const NavLinks = ({ 
  mobile = false, 
  onNavigate,
  className
}: { 
  mobile?: boolean; 
  onNavigate?: () => void;
  className?: string;
}) => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/categories", label: "Categories" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={cn(
            "text-gray-700 hover:text-market-600 transition-colors",
            mobile ? "py-2 text-lg font-medium" : "",
            className
          )}
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};
