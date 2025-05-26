import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Truck, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle,
  CalendarIcon,
  Map,
  Check,
  X,
  MoreHorizontal
} from "lucide-react";
import { format } from "date-fns";
import { Order } from "@/services/types/order.types";
import OrderTrackingMap from "./OrderTrackingMap";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpdateCustomerOrderStatusMutation } from "@/services/api/ordersApi";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

interface OrderDetailsDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderDetailsDialog = ({ order, open, onOpenChange }: OrderDetailsDialogProps) => {
  const [activeTab, setActiveTab] = useState<"details" | "tracking">("details");
  const [showMap, setShowMap] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const { toast } = useToast();
  
  const [updateOrderStatus, { isLoading: isStatusUpdating }] = useUpdateCustomerOrderStatusMutation();
  
  if (!order) return null;

  // Determine if order actions should be shown
  const showActions = ['shipped', 'processing'].includes(order.status.toLowerCase());

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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  // Handle order status updates
  const handleDelivered = async () => {
    try {
      const response = await updateOrderStatus({
        orderId: order.orderId,
        status: 'delivered'
      }).unwrap();
      
      toast({
        title: "Order confirmed",
        description: "Thank you for confirming delivery of your order.",
        variant: "default",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was a problem updating the order status.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Reason required",
        description: "Please provide a reason for rejecting the order.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await updateOrderStatus({
        orderId: order.orderId,
        status: 'rejected',
        reason: rejectReason
      }).unwrap();
      
      toast({
        title: "Order rejected",
        description: "Your rejection has been recorded. Our support team will contact you.",
        variant: "default",
      });
      
      setShowRejectDialog(false);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was a problem updating the order status.",
        variant: "destructive",
      });
    }
  };

  const handleDispute = async () => {
    try {
      const response = await updateOrderStatus({
        orderId: order.orderId,
        status: 'disputed'
      }).unwrap();
      
      toast({
        title: "Dispute filed",
        description: "Your dispute has been filed. Our support team will contact you shortly.",
        variant: "default",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was a problem filing your dispute.",
        variant: "destructive",
      });
    }
  };

  // Sample tracking data for demonstration - in a real app this would come from the backend
  const trackingData = {
    currentLocation: {
      lat: 9.0820,  // Example coordinates (Nigeria)
      lng: 8.6753
    },
    destination: {
      lat: 9.5820,
      lng: 8.9753
    }
  };

  const renderTrackingTimeline = () => {
    const timeline = [
      { status: 'Order Placed', date: order.orderDate, completed: true },
      { status: 'Processing', date: null, completed: order.status !== 'pending' },
      { status: 'Shipped', date: null, completed: ['shipped', 'delivered'].includes(order.status.toLowerCase()) },
      { status: 'Delivered', date: null, completed: order.status.toLowerCase() === 'delivered' }
    ];

    return (
      <div className="space-y-3 mt-4">
        {timeline.map((step, index) => (
          <div key={index} className="flex items-start">
            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-market-100' : 'bg-gray-100'}`}>
              {step.completed ? (
                <CheckCircle className={`h-5 w-5 ${step.completed ? 'text-market-600' : 'text-gray-400'}`} />
              ) : (
                <div className="h-3 w-3 rounded-full bg-gray-300"></div>
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h4 className={`text-sm font-semibold ${step.completed ? 'text-market-700' : 'text-gray-500'}`}>
                  {step.status}
                </h4>
                {step.date && (
                  <span className="text-xs text-gray-500">
                    {format(new Date(step.date), 'MMM dd, yyyy')}
                  </span>
                )}
              </div>
              {index < timeline.length - 1 && (
                <div className="ml-1 mt-1 mb-1 h-8 border-l-2 border-dashed border-gray-200"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Package className="h-5 w-5" /> Order #{order.orderId}
            </DialogTitle>
            <DialogDescription>
              Placed on {format(new Date(order.orderDate), 'MMMM dd, yyyy')}
            </DialogDescription>
          </DialogHeader>

          {/* Order Actions for Shipped Orders */}
          {showActions && (
            <div className="bg-slate-50 p-4 rounded-md mb-4">
              <h3 className="text-sm font-semibold mb-3">Order Actions</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={handleDelivered}
                  disabled={isStatusUpdating}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1"
                >
                  <Check className="h-4 w-4" /> Confirm Delivery
                </Button>
                
                <Button 
                  onClick={() => setShowRejectDialog(true)}
                  disabled={isStatusUpdating}
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" /> Reject
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <MoreHorizontal className="h-4 w-4" /> More Options
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleDispute}>
                      File a Dispute
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      window.open(`mailto:support@Sellio.com?subject=Order ${order.orderId} Inquiry`, '_blank');
                    }}>
                      Contact Support
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          {/* Tabs for Order Details and Tracking */}
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "details" | "tracking")}
            className="mt-2"
          >
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="details">Order Details</TabsTrigger>
              <TabsTrigger value="tracking">Track Order</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-4">
              {/* Order Status */}
              <div className="bg-slate-50 p-4 rounded-md mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-semibold">Status:</span>
                    <Badge className={`${getOrderStatusColor(order.status)} font-medium`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 text-sm">
                      Last updated: {format(new Date(order.orderDate), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tracking Information */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-market-600" /> Tracking Information
                </h3>
                <div className="bg-white border rounded-md p-4">
                  {order.shipping.tracking ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Tracking Number:</span>
                        <span className="font-medium">{order.shipping.tracking}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Carrier:</span>
                        <span className="font-medium">{order.shipping.method}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4 w-full border-market-200 text-market-600 hover:bg-market-50"
                        onClick={() => {
                          setActiveTab("tracking");
                          setShowMap(true);
                        }}
                      >
                        <Map className="mr-2 h-4 w-4" /> View Package Location
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-2 text-gray-500">
                      Tracking information will be available once the order is shipped
                    </div>
                  )}
                </div>
              </div>

              {/* Products */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 rounded border overflow-hidden">
                                <img 
                                  src={item.product.image || "/placeholder.svg"} 
                                  alt={item.product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.seller.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                            {formatCurrency(item.product.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {formatCurrency(item.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary and Shipping Address */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Order Summary */}
                <div>
                  <h3 className="font-semibold mb-2">Order Summary</h3>
                  <div className="bg-white border rounded-md p-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(order.totals.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping:</span>
                      <span>{formatCurrency(order.totals.shipping)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax:</span>
                      <span>{formatCurrency(order.totals.tax)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>{formatCurrency(order.totals.final)}</span>
                    </div>
                    <div className="text-sm mt-2 flex items-center gap-1 text-gray-500">
                      <span>Payment Status:</span>
                      <Badge 
                        variant={order.payment.status === 'paid' ? 'default' : 'outline'}
                        className={order.payment.status === 'paid' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100' : ''}
                      >
                        {order.payment.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm flex items-center gap-1 text-gray-500">
                      <span>Payment Method:</span>
                      <span className="capitalize">{order.payment.method}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-market-600" /> Shipping Address
                  </h3>
                  <div className="bg-white border rounded-md p-4">
                    <div className="text-gray-800">
                      <p className="font-medium">{order.shipping.address.fullName}</p>
                      <p>{order.shipping.address.street}</p>
                      <p>
                        {order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.zipCode}
                      </p>
                      <p>{order.shipping.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tracking" className="pt-4">
              <div className="bg-white border rounded-md p-4 mb-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-market-600" /> Package Location
                </h3>
                
                {order.shipping.tracking ? (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Tracking Number:</span>
                        <span className="font-medium">{order.shipping.tracking}</span>
                      </div>
                      <div className="flex justify-between mb-4">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={`${getOrderStatusColor(order.status)} font-medium`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Google Map Component */}
                    <OrderTrackingMap trackingInfo={trackingData} />
                    
                    {/* Tracking Timeline */}
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Shipment Progress</h4>
                      {renderTrackingTimeline()}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 px-4">
                    <Truck className="h-16 w-16 mx-auto text-gray-300 mb-2" />
                    <h3 className="font-semibold text-lg mb-2">No tracking available yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Tracking information will be available once your order has been shipped. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Rejection Reason Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Order</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason why you're rejecting this order. This will help our support team assist you better.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Describe the issue with your order..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRejectReason("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReject}
              disabled={!rejectReason.trim() || isStatusUpdating}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Submit Rejection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderDetailsDialog;
