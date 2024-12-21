import HeroSection from "@/components/home/HeroSection";
import FeaturedShops from "@/components/home/FeaturedShops";
import HowItWorks from "@/components/home/HowItWorks";
import PromotionalBanner from "@/components/home/PromotionalBanner";
import CustomerTestimonials from "@/components/home/CustomerTestimonials";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedShops />
      <HowItWorks />
      <PromotionalBanner />
      <CustomerTestimonials />
    </div>
  );
}
