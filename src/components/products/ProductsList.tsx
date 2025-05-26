
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/services/types/product.types";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";

interface ProductsListProps {
  products: Product[];
  viewMode: "grid" | "list";
  handleAddToCart: (product: Product) => void;
  isLoading: boolean;
  isFetching: boolean;
  pagination: {
    total: number;
    pages: number;
    currentPage: string;
    limit: string;
  };
  page: number;
  setPage: (page: number) => void;
  clearAllFilters: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
};

export const ProductsList = ({
  products,
  viewMode,
  handleAddToCart,
  isLoading,
  isFetching,
  pagination,
  page,
  setPage,
  clearAllFilters
}: ProductsListProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p>Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4 text-gray-400">
          <svg className="mx-auto h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 7a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
        <p className="text-gray-500 mb-6">Try changing your search or filter criteria</p>
        <Button onClick={clearAllFilters}>Clear all filters</Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{products.length}</span> of{" "}
          <span className="font-medium">{pagination.total}</span> products
        </p>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product._id} className="overflow-hidden">
              <div className="flex">
                <Link to={`/products/${product._id}`} className="w-40 h-40 flex-shrink-0">
                  <div className="w-full h-full overflow-hidden">
                    <img 
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>
                <CardContent className="flex-1 p-4">
                  <div className="flex justify-between">
                    <div>
                      <Link to={`/categories/${product.category._id}`}>
                        <Badge variant="outline" className="mb-2">
                          {product.category.name}
                        </Badge>
                      </Link>
                      <Link to={`/products/${product._id}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:text-market-600 transition-colors">{product.name}</h3>
                      </Link>
                      <div className="flex items-center text-sm mb-2">
                        <Link to={`/vendor/${product.sellerId._id}`} className="text-market-600 hover:underline">
                          {product.sellerId.businessName}
                        </Link>
                        <span className="mx-2 text-gray-300">•</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{product.metadata.rating.average}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold">{formatCurrency(product.price.current)}</span>
                      {product.price.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {formatCurrency(product.price.current * (1 + product.price.discount/100))}
                        </span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-market-600 hover:bg-market-700"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page === 1 || isFetching}
              onClick={() => setPage(Math.max(1, page - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page === pagination.pages || isFetching}
              onClick={() => setPage(Math.min(pagination.pages, page + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsList;
