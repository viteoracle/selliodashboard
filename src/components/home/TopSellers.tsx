
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Store, ArrowRight, ShoppingBag } from "lucide-react";
import { useGetTopSellersQuery } from "@/services/api/userApi";
import { Skeleton } from "@/components/ui/skeleton";

const TopSellers = () => {
  const { data, isLoading, error } = useGetTopSellersQuery();

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">
              Unable to load top sellers. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-market-100 text-market-800 text-sm font-medium mb-4">
              <Store className="h-4 w-4 mr-1 text-market-600" /> Best Sellers
            </div>
            <h2 className="text-3xl font-bold mb-2">Top Rated Vendors</h2>
            <p className="text-gray-600 max-w-lg">
              Shop with confidence from our most trusted and highly-rated sellers
            </p>
          </div>
          <Link to="/vendors" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              View All Vendors
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="bg-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.sellers.map((seller) => (
              <Link to={`/vendor/${seller.id}`} key={seller.id}>
                <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {seller.logo ? (
                          <img 
                            src={seller.logo} 
                            alt={seller.businessName} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Store className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{seller.businessName}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <div className="flex items-center mr-3">
                            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                            <span>{seller.rating.average.toFixed(1)}</span>
                            <span className="text-gray-400 ml-1">({seller.rating.count})</span>
                          </div>
                          <div className="flex items-center">
                            <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                            <span>{seller.totalProducts} products</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-2 text-market-600 border-market-200 hover:bg-market-50">
                      View Store
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopSellers;
