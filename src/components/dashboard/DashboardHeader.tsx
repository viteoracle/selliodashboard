
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actionIcon?: LucideIcon;
  actionLabel?: string;
  actionLink?: string;
}

export const DashboardHeader = ({ 
  title, 
  subtitle, 
  actionIcon: ActionIcon, 
  actionLabel, 
  actionLink 
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
      </div>
      {actionLabel && actionLink && (
        <Link to={actionLink}>
          <Button className="shadow-sm font-medium">
            {ActionIcon && <ActionIcon className="mr-2 h-4 w-4" />}
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
};
