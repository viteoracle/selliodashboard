
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically send the email to your API
    console.log("Subscribing email:", email);
    
    toast({
      title: "Success!",
      description: "You've successfully subscribed to our newsletter.",
    });
    
    setEmail("");
  };

  return (
    <section className="bg-market-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Stay updated with the latest products, vendor announcements, and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-grow">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit">Subscribe</Button>
          </form>
          <p className="text-gray-500 text-xs mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Sellio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
