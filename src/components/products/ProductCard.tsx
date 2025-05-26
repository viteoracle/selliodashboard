
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/services/types/product.types";

interface ProductCardProps {
  product: Product;
  handleAddToCart: (product: Product) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
};

export const ProductCard = ({ product, handleAddToCart }: ProductCardProps) => {
  return (
    <Card key={product._id} className="overflow-hidden group">
      <div className="relative">
        <Link to={`/products/${product._id}`}>
          <div className="aspect-square overflow-hidden">
            <img 
              src={product.images.find(img => img.isDefault)?.url || product.images[0]?.url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold mb-1 line-clamp-2 hover:text-market-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center text-sm mb-2">
          <Link to={`/vendor/${product.sellerId._id}`} className="text-market-600 hover:underline">
            {product.sellerId.businessName}
          </Link>
          <span className="mx-2 text-gray-300">•</span>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
            <span>{product.metadata.rating.average || 0}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
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
            className="rounded-full w-8 h-8 p-0 bg-market-600 hover:bg-market-700"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              handleAddToCart(product);
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
