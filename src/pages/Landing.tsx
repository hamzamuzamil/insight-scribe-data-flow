
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TemplatesSection } from "@/components/TemplatesSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { Stats } from "@/components/Stats";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundGradient />
      <Header />
      <main className="flex-grow relative z-10">
        <HeroSection />
        <Stats />
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
