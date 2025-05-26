
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/services/hooks/useAuth";
import { useGetPublicProductQuery, useGetRelatedProductsQuery, useIncrementProductViewsMutation } from "@/services/api/productsApi";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Heart, Share2, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/services/hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [incrementViews] = useIncrementProductViewsMutation();

  // Use authenticated endpoint if user is logged in
  const { data: product, isLoading, error } =  useGetPublicProductQuery(id);

  const { data: relatedProductsData, isLoading: relatedProductsLoading } = useGetRelatedProductsQuery({ 
    id: id,
    limit: 4
  }, {
    skip: !id // Skip this query if id is not available
  });

  // Increment view count on component mount
  useEffect(() => {
    if (id) {
      incrementViews(id).catch(console.error);
    }
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Images Loading State */}
            <div>
              <Skeleton className="aspect-square rounded-lg mb-4" />
              <div className="grid grid-cols-3 gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>

            {/* Product Info Loading State */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2 space-x-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <div className="flex items-center mb-4 space-x-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-28 mb-6" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {(error as any)?.message || 'Product not found'}
            </h2>
            <Link to="/products" className="mt-4 text-market-600 hover:underline">
              Back to products
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const { addToCart } = useCart();

  const renderPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Update handleAddToCart
  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price.current,
      quantity: quantity,
      image: product.images[0].url
    }, quantity);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/products" className="flex items-center text-sm text-market-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to products
          </Link>
        </div>

        {/* Main product section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img 
                src={product.images[selectedImage].url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={image._id} 
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index ? 'border-market-600' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image.url}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <Link 
                  to={`/vendor/${product.sellerId._id}`} 
                  className="text-market-600 hover:underline text-sm"
                >
                  {product.sellerId.businessName}
                </Link>
                <span className="mx-2 text-gray-400">•</span>
                <Link 
                  to={`/categories/${product.category._id}`} 
                  className="text-gray-500 hover:underline text-sm"
                >
                  {product.category.name}
                </Link>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-500 text-sm">
                  {product.metadata.views} views
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(product.metadata.rating.average) 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.metadata.rating.average} ({product.metadata.rating.count} reviews)
                  </span>
                </div>
                <span className="text-green-600 text-sm">
                  {product.inventory.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl font-bold">{renderPrice(product.price.current)}</span>
                {product.price.discount > 0 && (
                  <>
                    <span className="text-gray-500 line-through">
                      {renderPrice(product.price.current * (1 + product.price.discount/100))}
                    </span>
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                      {product.price.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <div className="flex items-center border border-gray-300 inline-flex rounded-md">
                  <button
                    className="px-3 py-1 border-r border-gray-300"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    className="px-3 py-1 border-l border-gray-300"
                    onClick={() => setQuantity(Math.min(product.inventory.quantity, quantity + 1))}
                    disabled={quantity >= product.inventory.quantity}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                  <Heart className="mr-2 h-5 w-5" /> Wishlist
                </Button>
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products section with proper conditional rendering */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          {relatedProductsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square bg-gray-100">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-1/4" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : relatedProductsData && relatedProductsData?.products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProductsData?.products?.map((relatedProduct) => (
                <Card key={relatedProduct?._id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <Link to={`/products/${relatedProduct._id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={relatedProduct.images[0].url} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link to={`/products/${relatedProduct._id}`} className="hover:text-market-600">
                      <h3 className="font-semibold mb-1 line-clamp-2">{relatedProduct.name}</h3>
                    </Link>
                    <div className="flex items-center text-sm mb-2">
                      <span>{relatedProduct.sellerId.businessName}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{relatedProduct.metadata.rating.average}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{renderPrice(relatedProduct.price.current)}</span>
                      <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No related products found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
