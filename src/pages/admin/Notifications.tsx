
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #1234 has been placed",
    type: "info",
    time: "5 minutes ago",
  },
  {
    id: 2,
    title: "Low Stock Alert",
    message: "Product 'Wireless Earbuds' is running low",
    type: "warning",
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "Payment Successful",
    message: "Payment for order #1233 confirmed",
    type: "success",
    time: "4 hours ago",
  },
];

const NotificationsPage = () => {
  return (
    <Layout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start p-4 border rounded-lg hover:bg-slate-50"
                >
                  <div className="mr-4">
                    {notification.type === "info" && (
                      <Info className="h-6 w-6 text-blue-500" />
                    )}
                    {notification.type === "warning" && (
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    )}
                    {notification.type === "success" && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-sm text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
