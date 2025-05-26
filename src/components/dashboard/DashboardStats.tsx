
import { ReactNode } from "react";
import { StatCard } from "./StatCard";
import { BarChart3, Package, Users, DollarSign } from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalSales: number;
    activeProducts: number;
    activeUsers: number;
    revenue: number;
  };
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={DollarSign}
        title="Total Sales"
        value={`$${stats.totalSales.toLocaleString()}`}
        trend={{ value: 20.1, isPositive: true }}
        bgColor="bg-violet-50"
      />
      <StatCard
        icon={Package}
        title="Active Products"
        value={stats.activeProducts.toLocaleString()}
        trend={{ value: 8, isPositive: true }}
        bgColor="bg-blue-50"
      />
      <StatCard
        icon={Users}
        title="Active Users"
        value={stats.activeUsers.toLocaleString()}
        trend={{ value: 12, isPositive: true }}
        bgColor="bg-emerald-50"
      />
      <StatCard
        icon={BarChart3}
        title="Revenue"
        value={`$${stats.revenue.toLocaleString()}`}
        trend={{ value: 15, isPositive: true }}
        bgColor="bg-amber-50"
      />
    </div>
  );
};
