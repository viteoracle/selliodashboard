
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Gift, TrendingUp, Check, Users } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-market-50 to-market-100 py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-market-100 px-3 py-1.5 text-sm font-medium text-market-800">
              <span className="animate-pulse mr-1.5">●</span> New marketplace launch
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Shop Locally, <span className="text-market-600 inline-block">Connect Globally</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Sellio brings together vendors and shoppers in a seamless online marketplace. 
              Discover unique products from local sellers or start selling your own items today.
            </p>
            
            <div className="space-y-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-market-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-market-600" />
                  </div>
                  <span className="text-gray-700">Trusted by 10,000+ customers</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-market-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-market-600" />
                  </div>
                  <span className="text-gray-700">Secure payment processing</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-market-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-market-600" />
                  </div>
                  <span className="text-gray-700">Fast worldwide shipping</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-market-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-market-600" />
                  </div>
                  <span className="text-gray-700">24/7 dedicated support</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="px-8 shadow-lg shadow-market-200/50 bg-market-600 hover:bg-market-700">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Shop Now
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="px-8 border-market-300">
                  Become a Seller
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-market-600" />
                <span className="text-sm font-medium">10k+ Products</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-market-600" />
                <span className="text-sm font-medium">1.5k+ Vendors</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-market-600" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-market-600" />
                <span className="text-sm font-medium">Community Support</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative h-[550px] w-full overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
                alt="Marketplace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            {/* Stats cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[200px] border border-gray-50">
              <div className="flex items-center mb-2">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">1,500+ Active Vendors</span>
              </div>
              <p className="text-xs text-gray-500">Join our growing community today</p>
            </div>
            
            <div className="absolute top-10 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-[200px] border border-gray-50">
              <div className="flex items-center mb-2">
                <div className="h-3 w-3 bg-market-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">10,000+ Products</span>
              </div>
              <p className="text-xs text-gray-500">Find exactly what you need</p>
            </div>
            
            <div className="absolute top-1/2 -right-4 bg-white p-4 rounded-lg shadow-lg max-w-[220px] border border-gray-50">
              <div className="flex items-center mb-2">
                <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">4.9 Average Rating</span>
              </div>
              <p className="text-xs text-gray-500">Trusted by thousands of customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
