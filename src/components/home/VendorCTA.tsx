
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const VendorCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1000&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-market-800/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Start Selling on Sellio Today
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of successful vendors and reach customers worldwide. Our platform provides all the tools you need to grow your business online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/seller/register">
              <Button size="lg" className="px-8">
                Become a Seller
              </Button>
            </Link>
            <Link to="/seller/guide">
              <Button variant="outline" size="lg" className="px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorCTA;
