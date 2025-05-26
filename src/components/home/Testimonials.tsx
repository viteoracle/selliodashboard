
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    quote: "As a small business owner, Sellio has been a game-changer for me. The platform is easy to use, and I've been able to reach customers I never would have found otherwise.",
    name: "Sarah Johnson",
    title: "Owner, Handmade Crafts",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    quote: "The analytics tools provided by Sellio have helped me understand my customers better and grow my sales by over 40% in just three months.",
    name: "Michael Chen",
    title: "Electronics Vendor",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 3,
    quote: "I was hesitant to move my business online, but the support team at Sellio made the transition seamless. Now I can't imagine running my store any other way.",
    name: "Emma Rodriguez",
    title: "Vintage Boutique Owner",
    image: "https://i.pravatar.cc/150?img=5",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Vendors Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the sellers who have grown their businesses on our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 inline-block text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 min-h-[120px]">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
