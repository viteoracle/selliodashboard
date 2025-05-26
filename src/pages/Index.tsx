
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import VendorCTA from "@/components/home/VendorCTA";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSignup from "@/components/common/NewsletterSignup";
import HowItWorks from "@/components/home/HowItWorks";
import TrendingProducts from "@/components/home/TrendingProducts";
import TopSellers from "@/components/home/TopSellers";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <FeaturedCategories />
      <FeaturedProducts />
      <TrendingProducts />
      <TopSellers />
      <VendorCTA />
      <Testimonials />
      <NewsletterSignup />
    </Layout>
  );
};

export default Index;
