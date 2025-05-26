
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

export const StatCard = ({ icon: Icon, title, value, trend, bgColor = "bg-slate-100" }: StatCardProps) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="text-2xl font-bold">{value}</div>
            {trend && (
              <div className={`flex items-center mt-1 text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span>
                  {trend.isPositive ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a6.989 6.989 0 00-1.668 1.115 7.02 7.02 0 00-2.229 5.311c0 .88.173 1.735.506 2.542l-.424 1.696a.75.75 0 001.45.362l.427-1.71a7.002 7.002 0 007.153-3.44A1 1 0 0016 11h-2a1 1 0 100 2h.001a5 5 0 01-9.774-1.5c0-2.815 2.206-5 5-5a1 1 0 00.673-.353z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v.092a6.989 6.989 0 00-1.668 1.115 7.02 7.02 0 00-2.229 5.311c0 .88.173 1.735.506 2.542l-.424 1.696a.75.75 0 001.45.362l.427-1.71a7.002 7.002 0 007.153-3.44A1 1 0 0016 11h-2a1 1 0 100 2h.001a5 5 0 01-9.774-1.5c0-2.815 2.206-5 5-5a1 1 0 00.673-.353z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span>{trend.value}% {trend.isPositive ? 'increase' : 'decrease'}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-md ${bgColor}`}>
            <Icon className="h-6 w-6 text-market-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
