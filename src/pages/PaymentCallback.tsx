import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyPaymentQuery } from "@/services/api/ordersApi";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data, isError, error } = useVerifyPaymentQuery(reference || '', {
    skip: !reference,
  });

  useEffect(() => {
    if (data?.success) {
      // Store order details for confirmation page
      localStorage.setItem('orderReference', data?.transaction?.reference || '');
      localStorage.setItem('orderAmount', data.order?.totals?.final?.toString() || '0');
      
      toast({
        title: "Payment Successful",
        description: "Your order has been confirmed",
        variant: "default",
      });

      // Clear cart and redirect to order confirmation
      localStorage.removeItem('cart');
      navigate(`/order-confirmation`);
    }

    if (isError) {
      toast({
        title: "Payment Verification Failed",
        description: error?.data?.message || "There was an error verifying your payment",
        variant: "destructive",
      });
      navigate('/cart');
    }
  }, [data, isError, error]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-market-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Verifying Payment</h2>
          <p className="text-gray-600">Please wait while we confirm your payment...</p>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentCallback;
