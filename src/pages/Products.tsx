import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  X,
  FilterX 
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { useGetPublicProductsQuery } from "@/services/api/productsApi";
import { useCart } from "@/services/hooks/useCart";
import FiltersSection from "@/components/products/FiltersSection";
import ProductsList from "@/components/products/ProductsList";
import { Product } from "@/services/types/product.types";
import { formatCurrency } from "@/utils/currency";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { addToCart } = useCart();

  const { data: response, isLoading, isFetching } = useGetPublicProductsQuery({
    page,
    limit: 12,
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
    // minPrice: priceRange[0],
    // maxPrice: priceRange[1],
    sort: sortOption === 'featured' ? undefined : sortOption
  });

  const products = response?.products || [];
  const pagination = response?.pagination || {
    total: 0,
    pages: 0,
    currentPage: "1",
    limit: "10"
  };

  // Extract categories and brands with proper type handling
  const categories = Array.from(
    new Set(
      products
        .map(p => p.category?.name)
        .filter(Boolean) as string[]
    )
  );
  
  const brands = Array.from(
    new Set(
      products
        .map(p => p.sellerId?.businessName)
        .filter(Boolean) as string[]
    )
  );

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([0, 500]);
    setSelectedBrands([]);
    setSelectedRating(null);
    setSearchParams({}); // Clear URL params
  };          

  const activeFiltersCount = 
    (selectedCategory ? 1 : 0) +
    (selectedBrands.length > 0 ? 1 : 0) +
    (selectedRating ? 1 : 0) +
    ((priceRange[0] > 0 || priceRange[1] < 500) ? 1 : 0);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price.current,
      quantity: 1,
      image: product.images[0].url
    }, 1);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">All Products</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <Link to="/" className="hover:text-market-600">Home</Link>
                <span>/</span>
                <span className="text-gray-800">Products</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <Badge variant="outline" className="font-normal">
                      {activeFiltersCount} active
                    </Badge>
                  )}
                </div>
                <FiltersSection 
                  categories={categories}
                  brands={brands}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={handleCategoryChange}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  selectedRating={selectedRating}
                  setSelectedRating={setSelectedRating}
                  clearAllFilters={clearAllFilters}
                />
              </div>
            </div>
            
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetContent side="left" className="w-[85%] sm:max-w-md">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product search with our filters
                  </SheetDescription>
                </SheetHeader>
                <div className="overflow-y-auto flex-1">
                  <FiltersSection 
                    categories={categories}
                    brands={brands}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={handleCategoryChange}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                    selectedRating={selectedRating}
                    setSelectedRating={setSelectedRating}
                    clearAllFilters={clearAllFilters}
                  />
                </div>
                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button className="w-full">View {products.length} products</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <div className="flex-1">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex flex-1 w-full sm:w-auto gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden">
                          <SlidersHorizontal className="h-5 w-5 mr-2" />
                          Filters
                          {activeFiltersCount > 0 && (
                            <Badge className="ml-2 bg-market-600" variant="default">
                              {activeFiltersCount}
                            </Badge>
                          )}
                        </Button>
                      </SheetTrigger>
                    </Sheet>
                  </div>
                  <div className="flex w-full sm:w-auto items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded ${
                          viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7"></rect>
                          <rect x="14" y="3" width="7" height="7"></rect>
                          <rect x="3" y="14" width="7" height="7"></rect>
                          <rect x="14" y="14" width="7" height="7"></rect>
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 rounded ${
                          viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="18" x2="3" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {activeFiltersCount > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedCategory && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Category: {selectedCategory}
                        <button onClick={() => setSelectedCategory("")}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    {selectedBrands.length > 0 && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Brands: {selectedBrands.length}
                        <button onClick={() => setSelectedBrands([])}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    {selectedRating && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {selectedRating}+ Stars
                        <button onClick={() => setSelectedRating(null)}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    {(priceRange[0] > 0 || priceRange[1] < 500) && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                        <button onClick={() => setPriceRange([0, 500])}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
              
              <ProductsList
                products={products}
                viewMode={viewMode}
                handleAddToCart={handleAddToCart}
                isLoading={isLoading}
                isFetching={isFetching}
                pagination={pagination}
                page={page}
                setPage={setPage}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
