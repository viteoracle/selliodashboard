import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/services/hooks/useCart";
import { useGetPopularProductsQuery } from "@/services/api/productsApi";
import { PopularProduct } from "@/services/types/product.types";

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { data, isLoading } = useGetPopularProductsQuery({ limit: 4 });


  const handleAddToCart = (product: PopularProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price.current,
      image: product.image
    }, 1);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-market-600" />
        </div>
      </section>
    );
  }

  if (!data?.products.length) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-market-100 text-market-800 text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-1 text-market-600 fill-market-600" /> Featured Collection
            </div>
            <h2 className="text-3xl font-bold mb-2">Popular Products</h2>
            <p className="text-gray-600 max-w-lg">
              Our handpicked selection of quality products from trusted vendors
            </p>
          </div>
          <Link to="/products" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              View All Products 
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.products.map((product) => (
            <Card
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg group"
            >
              <Link to={`/products/${product.slug}`} className="block relative">
                <div className="h-60 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-market-600 text-white text-xs px-2 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </Link>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/products/${product.slug}`} className="hover:text-market-600 transition-colors">
                    <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                  </Link>
                  <div className="flex items-center bg-gray-50 rounded-full px-2 py-1">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-xs font-medium">{product.rating.average}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${product.seller.businessName}&background=random`} 
                    alt={product.seller.businessName}
                    className="w-5 h-5 rounded-full mr-2"
                  />
                  <Link to={`/vendor/${product.seller.id}`} className="text-market-600 hover:underline">
                    {product.seller.businessName}
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">${product.price.current.toFixed(2)}</span>
                    {product.price.discount && product.price.compareAt && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.price.compareAt.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    className="rounded-full w-9 h-9 p-0"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
