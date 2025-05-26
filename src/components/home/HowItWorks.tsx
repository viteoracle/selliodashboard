
import { ArrowRight, ShoppingBag, CheckSquare, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <ShoppingBag className="h-8 w-8 text-market-600" />,
    title: "Browse Our Products",
    description: "Explore our vast catalog of products from trusted vendors across the globe."
  },
  {
    icon: <CheckSquare className="h-8 w-8 text-market-600" />,
    title: "Make Your Selection",
    description: "Choose from thousands of high-quality items with detailed product information."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-market-600" />,
    title: "Receive & Enjoy",
    description: "Quick delivery to your doorstep with our reliable shipping partners."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-market-100 text-market-800 text-sm font-medium mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our marketplace makes shopping simple and straightforward. Follow these easy steps to find and purchase the products you love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-market-50 p-4 rounded-lg inline-block mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                <span className="text-market-600 mr-2">{index + 1}.</span>{step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="outline" className="group">
              Start Shopping Now 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
