import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetPublicSellerProfileQuery } from "@/services/api/userApi";
import { useGetPublicSellerProductsQuery } from "@/services/api/productsApi";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const VendorDetail = () => {
  const { vendorId } = useParams();
  const [activeTab, setActiveTab] = useState("products");
  const [page, setPage] = useState(1);

  const { data: vendor, isLoading: isVendorLoading } = useGetPublicSellerProfileQuery(vendorId!, {
    skip: !vendorId,
  });

  const { data: productsData, isLoading: isProductsLoading } = useGetPublicSellerProductsQuery(
    {
      sellerId: vendorId!,
      page,
      limit: 12,
    },
    {
      skip: !vendorId,
    }
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Transform API data to component format
  const vendorData = vendor
    ? {
        id: vendorId,
        name: vendor.businessName,
        logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          vendor.businessName
        )}&background=random&color=fff&size=128&font-size=0.5&length=2&bold=true`,
        description:
          "This vendor provides high-quality products at competitive prices...", // Keep default description
        rating: vendor.rating.average,
        ratingCount: vendor.rating.count,
        productsCount: vendor.totalProducts,
        location: vendor.businessAddress,
        memberSince: formatDate(vendor.joinedDate),
        phoneNumber: vendor.phoneNumber || "+2348012345678" // Default number if not provided
      }
    : null;

  // Function to format phone number for WhatsApp
  const formatWhatsAppNumber = (phoneNumber: string) => {
    // Remove any non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    
    // Ensure it starts with country code
    if (digits.startsWith('0')) {
      return '+234' + digits.substring(1); // Convert 0 prefix to +234 (Nigeria)
    } else if (!digits.startsWith('+')) {
      return '+' + digits;
    }
    
    return digits;
  };

  const handleContactWhatsApp = () => {
    if (vendorData) {
      const whatsappNumber = formatWhatsAppNumber(vendorData.phoneNumber);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello, I'm interested in your products on Sellio.`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Contacting Vendor",
        description: "Remember: Only complete transactions on Sellio platform for protection.",
      });
    }
  };

  if (isVendorLoading || isProductsLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!vendorData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div>Vendor not found</div>
        </div>
      </Layout>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Vendor Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden">
              <img
                src={vendorData.logo}
                alt={vendorData.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{vendorData.name}</h1>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>
                    {vendorData.rating} ({vendorData.ratingCount} reviews)
                  </span>
                </div>
                <div className="text-gray-600">
                  {vendorData.productsCount} Products
                </div>
                <div className="text-gray-600">{vendorData.location}</div>
                <div className="text-gray-600">
                  Member since {vendorData.memberSince}
                </div>
              </div>

              <p className="text-gray-700 mb-6 max-w-3xl">
                {vendorData.description}
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex gap-2 items-center">
                      <MessageSquare className="h-4 w-4" /> Contact on WhatsApp
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact {vendorData.name} on WhatsApp</DialogTitle>
                      <DialogDescription className="pt-4">
                        <div className="mb-6 text-amber-600 border border-amber-200 bg-amber-50 p-3 rounded-md">
                          <strong>Warning:</strong> Any transactions made outside the Sellio platform are not covered by our buyer protection policy. Sellio is not responsible for any issues arising from external transactions or communications.
                        </div>
                        <p className="mb-4">
                          By clicking the button below, you will be redirected to WhatsApp to contact this vendor. For your security, we recommend completing all transactions through Sellio.
                        </p>
                        <Button onClick={handleContactWhatsApp} className="w-full flex gap-2 justify-center">
                          <MessageSquare className="h-4 w-4" /> Continue to WhatsApp
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                {/* <Button variant="outline">Follow Store</Button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsData?.products.map((product) => (
                <Card
                  key={product._id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link to={`/products/${product._id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={
                          product.images.find((img) => img.isDefault)?.url ||
                          product.images[0]?.url
                        }
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link
                      to={`/products/${product._id}`}
                      className="hover:text-market-600"
                    >
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">
                        {formatCurrency(product.price.current)}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm">
                          {product.metadata.rating.average}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {productsData?.pagination.pages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={page === productsData.pagination.pages}
                  onClick={() =>
                    setPage((p) =>
                      Math.min(productsData.pagination.pages, p + 1)
                    )
                  }
                >
                  Next
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              <p className="text-gray-600">Reviews will be displayed here.</p>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">About {vendorData.name}</h2>
              <p className="text-gray-700 mb-4">{vendorData.description}</p>
              <p className="text-gray-700">
                Located in {vendorData.location}, this vendor has been a trusted
                member of our marketplace since {vendorData.memberSince}. With{" "}
                {vendorData.productsCount} products available and an average
                rating of {vendorData.rating}/5, they continue to provide
                excellent service to our community.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VendorDetail;
