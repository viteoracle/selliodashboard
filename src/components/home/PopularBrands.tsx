
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Store, ArrowRight, ShoppingBag } from "lucide-react";
import { useGetTopSellersQuery } from "@/services/api/userApi";
import { Skeleton } from "@/components/ui/skeleton";

const PopularBrands = () => {
  const { data, isLoading, error } = useGetTopSellersQuery(6);

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">
              Unable to load popular brands. Please try again later.
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
              <Store className="h-4 w-4 mr-1 text-market-600" /> Top Vendors
            </div>
            <h2 className="text-3xl font-bold mb-2">Popular Brands</h2>
            <p className="text-gray-600 max-w-lg">
              Discover our most loved brands with the highest quality products and customer satisfaction
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <Skeleton className="mx-auto mb-4 w-24 h-24 rounded-full" />
                <Skeleton className="h-5 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {data?.sellers.map((seller) => (
              <Link 
                key={seller.id} 
                to={`/vendor/${seller.id}`}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 text-center"
              >
                <div className="mx-auto mb-4 w-24 h-24 overflow-hidden rounded-full border-4 border-white shadow-md">
                  {seller.logo ? (
                    <img
                      src={seller.logo}
                      alt={seller.businessName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Store className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <h3 className="font-medium mb-1">{seller.businessName}</h3>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{seller.rating.average.toFixed(1)}</span>
                  <span className="text-gray-400 ml-1">({seller.rating.count})</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{seller.totalProducts} products</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularBrands;
