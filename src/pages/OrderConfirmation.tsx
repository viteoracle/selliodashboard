import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { formatCurrency } from "@/utils/format";
import { useEffect } from "react";

const OrderConfirmation = () => {
  // Get verified order details
  const orderRef = localStorage.getItem('orderReference') || `#${Math.floor(100000 + Math.random() * 900000)}`;
  const orderAmount = localStorage.getItem('orderAmount') ? 
    Number(localStorage.getItem('orderAmount')) : 
    0;

  useEffect(() => {
    // Clear payment data after showing confirmation
    localStorage.removeItem('orderReference');
    localStorage.removeItem('orderAmount');
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed
            and will be processed shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Order Number</span>
                <span className="font-mono">{orderRef}</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Total Amount</span>
                <span>{formatCurrency(orderAmount)}</span>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            {/* <Link to="/orders">
              <Button>View Order Status</Button>
            </Link> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
