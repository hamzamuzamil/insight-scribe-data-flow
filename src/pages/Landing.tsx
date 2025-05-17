
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TemplatesSection } from "@/components/TemplatesSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-black/95">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
