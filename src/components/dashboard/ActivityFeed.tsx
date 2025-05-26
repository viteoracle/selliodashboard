
import { Users, Package, AlertCircle, ShoppingCart, CalendarIcon, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: Users,
    title: "New user registered",
    time: "2 minutes ago",
    iconBg: "bg-market-100",
    iconColor: "text-market-600"
  },
  {
    id: 2,
    icon: Package,
    title: "New product added",
    time: "1 hour ago",
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: "New order received",
    time: "2 hours ago",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600"
  },
  {
    id: 4,
    icon: AlertCircle,
    title: "Sales report generated",
    time: "3 hours ago",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  }
];

export const ActivityFeed = () => {
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-center gap-4 py-2">
          <div className={`h-10 w-10 rounded-full ${activity.iconBg} flex items-center justify-center ${activity.iconColor}`}>
            <activity.icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock className="mr-1 h-3 w-3" />
              <span>{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="pt-2 mt-2 border-t">
        <a href="#" className="text-xs text-primary flex items-center hover:underline">
          View all activity
          <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};
