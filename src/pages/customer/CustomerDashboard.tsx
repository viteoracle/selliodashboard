import { useState } from "react";
import { useSelector } from 'react-redux';
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProfileQuery, useUpdateCustomerProfileMutation, selectShouldFetchProfile } from "@/services/api/userApi";
import { Badge } from "@/components/ui/badge";
import { useGetCustomerOrdersQuery } from "@/services/api/ordersApi";
import { ShoppingBag, User, Heart, Settings, Package, MapPin, CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import OrderDetailsDialog from "@/components/customer/OrderDetailsDialog";
import { Order } from "@/services/types/order.types";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersLimit] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(undefined, {
    skip: !useSelector(selectShouldFetchProfile)
  });
  const { data: ordersData, isLoading: ordersLoading } = useGetCustomerOrdersQuery({
    page: ordersPage,
    limit: ordersLimit
  });

  const { toast } = useToast();
  const [updateProfile] = useUpdateCustomerProfileMutation();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'processing':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (imageFile) {
      formData.append('profileImage', imageFile);
    }

    try {
      await updateProfile(formData).unwrap();
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setOrderDialogOpen(true);
  };

  if (profileLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-slate-200 h-16 w-16 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Dashboard Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="h-20 w-20 rounded-full bg-market-100 flex items-center justify-center text-market-600">
              <Avatar className="h-20 w-20 border-4 border-market-50">
                <AvatarFallback className="bg-market-100 text-market-600 text-2xl">
                  {profile?.fullName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Welcome back, {profile?.fullName}!</h1>
              <p className="text-muted-foreground mt-1">
                Member since {profile?.createdAt ? format(new Date(profile.createdAt), 'MMMM yyyy') : 'N/A'}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-market-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-market-100">
                      <ShoppingBag className="h-5 w-5 text-market-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-xl font-bold">{ordersData?.pagination.total || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-market-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-market-100">
                      <Heart className="h-5 w-5 text-market-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Wishlist</p>
                      <p className="text-xl font-bold">0</p>
                    </div>
                  </div>
                </div>
                <div className="bg-market-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-market-100">
                      <MapPin className="h-5 w-5 text-market-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Addresses</p>
                      <p className="text-xl font-bold">{profile?.addresses?.length || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-market-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-market-100">
                      <Package className="h-5 w-5 text-market-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Processing</p>
                      <p className="text-xl font-bold">{ordersData?.orders.filter(o => o.status === 'processing').length || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm">
            <TabsList className="p-1 w-full overflow-x-auto flex flex-nowrap justify-start border-b bg-white rounded-t-xl">
              <TabsTrigger value="orders" className="flex items-center gap-2 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-market-600">
                <ShoppingBag className="h-4 w-4" />
                Orders History
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-market-600">
                <Heart className="h-4 w-4" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-market-600">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-market-600">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="orders" className="space-y-4 mt-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-white rounded-t-xl pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShoppingBag className="h-5 w-5 text-market-600" /> 
                  Your Orders
                </CardTitle>
                <CardDescription>View and track your order history</CardDescription>
                <Separator className="mt-2" />
              </CardHeader>
              <CardContent className="p-0 bg-white rounded-b-xl">
                <div className="overflow-x-auto">
                  {ordersLoading ? (
                    <div className="p-8 text-center">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-12 w-12 rounded-full bg-slate-200 mb-4"></div>
                        <div className="h-4 bg-slate-200 rounded w-48 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-32"></div>
                      </div>
                    </div>
                  ) : ordersData?.orders.length === 0 ? (
                    <div className="p-8 text-center">
                      <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="font-medium text-lg mb-2">No orders yet</h3>
                      <p className="text-sm text-gray-500 mb-6">When you make your first order, it will appear here.</p>
                      <Button className="bg-market-600 hover:bg-market-700">Start Shopping</Button>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-y">
                          <th className="px-6 py-4">Order ID</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Items</th>
                          <th className="px-6 py-4">Total</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {ordersData?.orders.map((order) => (
                          <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-market-600">{order.orderId}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                                {format(new Date(order.orderDate), 'MMM dd, yyyy')}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={`${getOrderStatusColor(order.status)} font-medium`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <Package className="mr-2 h-4 w-4 text-gray-400" />
                                {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                              </div>
                            </td>
                            <td className="px-6 py-4 font-semibold">{formatCurrency(order.totals.final)}</td>
                            <td className="px-6 py-4 text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewOrderDetails(order)} 
                                className="border-market-200 text-market-600 hover:bg-market-50 hover:text-market-700"
                              >
                                View Details <ArrowRight className="ml-1 h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </CardContent>
            </Card>

            {ordersData?.pagination.pages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={ordersPage === 1}
                  onClick={() => setOrdersPage(p => Math.max(1, p - 1))}
                  className="border-market-200 text-market-600 hover:bg-market-50"
                >
                  Previous
                </Button>
                <div className="flex items-center text-sm px-2">
                  Page {ordersPage} of {ordersData.pagination.pages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={ordersPage === ordersData.pagination.pages}
                  onClick={() => setOrdersPage(p => Math.min(ordersData.pagination.pages, p + 1))}
                  className="border-market-200 text-market-600 hover:bg-market-50"
                >
                  Next
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-4 mt-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-white rounded-t-xl pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-market-600" /> 
                  My Wishlist
                </CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
                <Separator className="mt-2" />
              </CardHeader>
              <CardContent className="p-6 bg-white rounded-b-xl text-center">
                <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="font-medium text-lg mb-2">Your wishlist is empty</h3>
                <p className="text-sm text-gray-500 mb-6">Save items you love while browsing our products.</p>
                <Button className="bg-market-600 hover:bg-market-700">Explore Products</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-white rounded-t-xl pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-market-600" /> 
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details</CardDescription>
                <Separator className="mt-2" />
              </CardHeader>
              <CardContent className="p-6 bg-white rounded-b-xl">
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        defaultValue={profile?.fullName}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        defaultValue={profile?.phoneNumber}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="profileImage">Profile Image</Label>
                      <Input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-market-600 hover:bg-market-700">
                      Update Profile
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-white rounded-t-xl pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="h-5 w-5 text-market-600" /> 
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
                <Separator className="mt-2" />
              </CardHeader>
              <CardContent className="p-6 bg-white rounded-b-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-market-200">Manage</Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-gray-500">Change your password</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-market-200">Update</Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-market-200">Enable</Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium text-red-600">Delete Account</h3>
                      <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Order Details Dialog */}
      <OrderDetailsDialog 
        order={selectedOrder} 
        open={orderDialogOpen} 
        onOpenChange={setOrderDialogOpen} 
      />
    </Layout>
  );
};

export default CustomerDashboard;
