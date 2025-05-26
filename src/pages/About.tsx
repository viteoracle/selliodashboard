import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const About = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollContent = scrollContainer.firstElementChild as HTMLElement;
    if (!scrollContent) return;

    // Clone the content for seamless scrolling
    const clone = scrollContent.cloneNode(true) as HTMLElement;
    scrollContainer.appendChild(clone);

    // Calculate scroll step
    const step = 1; // Adjust speed by changing this value
    let position = 0;

    const scroll = () => {
      position += step;
      scrollContainer.scrollLeft = position;

      if (position >= scrollContent.offsetWidth) {
        position = 0;
        scrollContainer.scrollLeft = 0;
      }
    };

    const animationId = setInterval(scroll, 30);

    return () => clearInterval(animationId);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-market-600 to-purple-600">About Our Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connecting talented vendors with discerning customers through a modern, seamless shopping experience since 2020.
          </p>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <img
              src="/images/fullteam.png"
              alt="Our Mission"
              className="rounded-lg shadow-xl object-cover h-[400px] w-full"
            />
          </div>
          <div>
            <span className="text-market-600 font-semibold text-sm uppercase tracking-wider">Our Purpose</span>
            <h2 className="text-4xl font-bold mb-6 mt-2">Our Vision & Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe in creating opportunities for small businesses and artisans to reach
              a global audience. Our platform provides the tools and visibility needed for sellers
              to grow their business while offering buyers access to unique, quality products.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              By fostering a community of passionate entrepreneurs and connecting them with customers 
              who value quality and craftsmanship, we're building a marketplace that celebrates 
              creativity and supports sustainable business practices.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-market-600 hover:bg-market-700">Get in Touch</Button>
            </Link>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-market-600 font-semibold text-sm uppercase tracking-wider">What We Stand For</span>
            <h2 className="text-4xl font-bold mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-market-50 w-16 h-16 flex items-center justify-center rounded-full mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-market-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Quality First</h3>
              <p className="text-gray-600 text-center">
                We maintain high standards for all products on our platform, ensuring customers receive only the best.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-market-50 w-16 h-16 flex items-center justify-center rounded-full mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-market-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Community Growth</h3>
              <p className="text-gray-600 text-center">
                We invest in our seller community, providing tools and support to help their businesses thrive.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="bg-market-50 w-16 h-16 flex items-center justify-center rounded-full mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-market-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Global Reach</h3>
              <p className="text-gray-600 text-center">
                We connect sellers with customers worldwide, creating opportunities beyond local markets.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-market-600 to-purple-600 py-16 px-6 rounded-2xl mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-lg text-white/80">Active Sellers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">50k+</div>
              <div className="text-lg text-white/80">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">100k+</div>
              <div className="text-lg text-white/80">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-market-600 font-semibold text-sm uppercase tracking-wider">Our Leadership</span>
            <h2 className="text-4xl font-bold mt-2">Meet Our Team</h2>
          </div>
          <div className="relative overflow-hidden">
            <div 
              ref={scrollRef}
              className="overflow-x-hidden whitespace-nowrap"
            >
              <div className="inline-flex gap-8 px-4">
                {[
                  {
                    name: "Egungwu Ikenna Emmanuel",
                    role: "CEO & Founder",
                    image: "/images/ceo.png"
                  },
                  {
                    name: "Michael Davis",
                    role: "CTO",
                    image: "/images/cto.png"
                  },
                  {
                    name: "Chris Nduka Blessing",
                    role: "Head of Marketing",
                    image: "/images/hom.png"
                  },
                  {
                    name: "Favy",
                    role: "Public Relation Officer",
                    image: "/images/rpo.png"
                  },
                  {
                    name: "Okoye chidozie Augustine ",
                    role: "Advert team manager",
                    image: "/images/atm.png"
                  },
                  {
                    name: "Egungwu Chisom Nancy",
                    role: "Head of Publication",
                    image: "/images/hop.png"
                  },
                  {
                    name: "Azide Mmesoma",
                    role: "Secretary",
                    image: "/images/sec.png"
                  },
                  {
                    name: "Arinze Stella",
                    role: "Head of Graphic Design",
                    image: "/images/hogd.png"
                  },
                  {
                    name: "Emily Brown",
                    role: "Customer Success",
                    image: "/images/cs.png"
                  },
                  {
                    name: "Alex Martinez",
                    role: "Operations Manager",
                    image: "/images/ops.png"
                  },
                  {
                    name: "Nwabumma mmesoma favour",
                    role: "Treasurer",
                    image: "/images/tre.png"
                  }
                ].map((member, index) => (
                  <div 
                    key={index} 
                    className="inline-block w-48 text-center"
                    style={{ animation: 'none' }} // Prevent default hover animations
                  >
                    <div className="relative mx-auto w-48 h-48 mb-4 rounded-full overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold whitespace-normal">{member.name}</h3>
                    <p className="text-gray-600 whitespace-normal">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
