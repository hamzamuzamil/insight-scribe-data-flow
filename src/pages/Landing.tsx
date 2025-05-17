
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TemplatesSection } from "@/components/TemplatesSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { Stats } from "@/components/Stats";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GalleryHorizontal, ChevronUp } from "lucide-react";

const Landing = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundGradient />
      
      {/* Regular Header - visible initially */}
      <Header />
      
      {/* Sticky Header - appears on scroll */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 invisible md:visible"
        style={{ 
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
        }}
      >
        <div className="glass border-b border-white/10 shadow-lg">
          <div className="container flex items-center justify-between h-16 px-4">
            <Link to="/" className="font-bold text-xl text-gradient">ProReporter</Link>
            <div className="flex items-center gap-6">
              <Link to="/templates" className="text-sm hover:text-primary transition-colors">Templates</Link>
              <Link to="/app" className="text-sm hover:text-primary transition-colors">Dashboard</Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="sm" className="shadow-glow-primary">
                  <Link to="/app">
                    <GalleryHorizontal className="h-4 w-4 mr-1" />
                    <span>Try For Free</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <main className="flex-grow relative z-10">
        <HeroSection />
        <Stats />
        <FeaturesSection />
        <TemplatesSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full h-12 w-12 glass shadow-glow-primary flex items-center justify-center"
              onClick={scrollToTop}
            >
              <ChevronUp className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
