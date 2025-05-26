
import { useState } from "react";
import { Link } from "react-router-dom";
import { Store, Star, Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useGetAllVendorsQuery } from "@/services/api/userApi";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Vendors = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [sort, setSort] = useState("rating");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useGetAllVendorsQuery({
    page,
    limit,
    sort,
    search,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already reactive with the query
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-500">Unable to load vendors. Please try again later.</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">All Vendors</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our complete list of trusted vendors offering high-quality products and exceptional service to meet all your needs.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
          <form onSubmit={handleSearch} className="w-full md:w-auto flex gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search vendors..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          <div className="flex gap-2 items-center mt-4 md:mt-0">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Best Rating</SelectItem>
                <SelectItem value="products">Most Products</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4 mb-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-9 w-full mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.sellers.map((seller) => (
                <Link to={`/vendor/${seller.id}`} key={seller.id}>
                  <Card className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full hover:border-market-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center mb-4">
                        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-3 border-4 border-white shadow-md">
                          {seller.logo ? (
                            <img 
                              src={seller.logo} 
                              alt={seller.businessName} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Store className="h-10 w-10 text-gray-400" />
                          )}
                        </div>
                        <h3 className="font-semibold text-lg text-center mt-2">{seller.businessName}</h3>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                            <span>{seller.rating.average.toFixed(1)}</span>
                            <span className="text-gray-400 ml-1">({seller.rating.count})</span>
                          </div>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          <span>{seller.totalProducts} products</span>
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

            {data && data.pagination.pages > 1 && (
              <Pagination className="mt-10">
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: Math.min(5, data.pagination.pages) }).map((_, i) => {
                    const pageNumber = page <= 3 
                      ? i + 1 
                      : page >= data.pagination.pages - 2 
                        ? data.pagination.pages - 4 + i 
                        : page - 2 + i;
                        
                    if (pageNumber > 0 && pageNumber <= data.pagination.pages) {
                      return (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            isActive={pageNumber === page}
                            onClick={() => setPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  {page < data.pagination.pages && (
                    <PaginationItem>
                      <PaginationNext onClick={() => setPage(p => Math.min(data.pagination.pages, p + 1))} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Vendors;
