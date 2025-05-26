
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterX, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FiltersSectionProps {
  categories: string[];
  brands: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  clearAllFilters: () => void;
}

export const FiltersSection = ({
  categories,
  brands,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedRating,
  setSelectedRating,
  clearAllFilters,
}: FiltersSectionProps) => {
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider
          defaultValue={[0, 500]}            
          min={0}
          max={500}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{formatCurrency(priceRange[0])}</span>
          <span className="text-sm text-gray-600">{formatCurrency(priceRange[1])}</span>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full" defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Button
                  variant={selectedCategory === "" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("")}
                  className="w-full justify-start text-sm h-8"
                >
                  All Categories
                </Button>
              </div>
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Button
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="w-full justify-start text-sm h-8"
                  >
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion type="single" collapsible className="w-full" defaultValue="brands">
        <AccordionItem value="brands">
          <AccordionTrigger className="font-medium">Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion type="single" collapsible className="w-full" defaultValue="ratings">
        <AccordionItem value="ratings">
          <AccordionTrigger className="font-medium">Ratings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingSelect(rating)}
                  className={`flex items-center w-full py-1.5 px-2 rounded-md transition ${
                    selectedRating === rating ? 'bg-market-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">& Up</span>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button 
        variant="outline" 
        onClick={clearAllFilters}
        className="w-full border-dashed"
      >
        <FilterX className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );
};

export default FiltersSection;
