
import { useGetCategoryStatsQuery } from "@/services/api/categoriesApi";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const Categories = () => {
  const { data, isLoading, error } = useGetCategoryStatsQuery();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="relative rounded-lg overflow-hidden">
              <Skeleton className="aspect-square w-full" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.categories.map((category) => (
          <Link 
            key={category.id}
            to={`/products?category=${category.slug}`}
            className="group"
          >
            <div className="relative rounded-lg overflow-hidden">
              <div className="aspect-square">
                <img 
                  src={category.image.thumbnail}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-sm">{category.stats.products} Products</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
        {renderContent()}
      </div>
    </Layout>
  );
};

export default Categories;
