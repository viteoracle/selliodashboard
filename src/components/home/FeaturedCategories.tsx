
import { Link } from "react-router-dom";
import { useGetPopularCategoriesQuery } from "@/services/api/categoriesApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const FeaturedCategories = () => {
  const { data, isLoading, error } = useGetPopularCategoriesQuery({ limit: 8 });
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="relative rounded-xl overflow-hidden">
              <Skeleton className="h-64 w-full" />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Failed to load categories</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.categories.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.slug}`}
            className="group block overflow-hidden rounded-xl bg-gray-100 transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={category.thumbnail}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">
                  {category.image.title || category.name}
                </h3>
                <p className="text-sm text-white/80">
                  {category.image.subtitle || `${category.productCount} products`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Popular Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for, from the latest tech gadgets to handcrafted items.
          </p>
        </div>

        {renderContent()}

        <div className="text-center mt-12">
          <Link to="/categories">
            <button className="text-market-600 hover:text-market-700 font-medium">
              View All Categories →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
