
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GalleryHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container flex flex-col items-center text-center animate-fade-in">
        <div
          className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-0 ml-[-38%] h-[25rem] w-[81.25rem] dark:-ml-[24%] dark:w-[90.25rem]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-400/30 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-primary/30 dark:to-purple-400/30">
              <svg
                aria-hidden="true"
                className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/5 dark:stroke-white/5"
              >
                <defs>
                  <pattern
                    id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                    width="72"
                    height="56"
                    patternUnits="userSpaceOnUse"
                    x="50%"
                    y="16"
                  >
                    <path d="M.5 56V.5H72" fill="none"></path>
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="0"
                  fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
                ></rect>
              </svg>
            </div>
          </div>
        </div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-70"></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl text-gradient mb-6">
            Upload your data. Discover the truth.
          </h1>
        </motion.div>
        
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ProReporter turns your raw data into actionable insights with AI-powered analytics.
          Ask natural language questions and get instant answers and visualizations.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="px-8 shadow-glow-primary relative overflow-hidden group">
              <Link to="/app">
                <span className="relative z-10">Get Started for Free</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/templates">
                <GalleryHorizontal className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                <span>View Templates</span>
                <span className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-16 w-full max-w-5xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="rounded-xl overflow-hidden border border-white/10 glass shadow-2xl transform-gpu hover:scale-[1.01] transition-all duration-500 perspective-3d">
            <AspectRatio ratio={16/9} className="bg-gradient-to-br from-primary/5 to-purple-500/5">
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1600&auto=format&fit=crop"
                  alt="ProReporter Dashboard Preview"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80"></div>
                
                {/* 3D Chart Overlay Elements */}
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.5)] transform rotate-1 floating"></div>
                <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/4 bg-gradient-to-r from-green-500/30 to-teal-500/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(16,185,129,0.5)] transform -rotate-2 floating" style={{animationDelay: "1s"}}></div>
                <div className="absolute top-1/3 right-1/5 w-1/4 h-1/5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.5)] transform rotate-3 floating" style={{animationDelay: "0.5s"}}></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
                <div className="bg-card/80 backdrop-blur-md p-3 rounded-lg flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <GalleryHorizontal className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Revenue Analytics</p>
                    <p className="text-xs text-muted-foreground">Q1 2025 Report</p>
                  </div>
                </div>
                <div className="hidden md:block bg-card/80 backdrop-blur-md py-2 px-3 rounded-lg">
                  <p className="text-xs">Growth increased by <span className="text-green-400 font-medium">24%</span> since last quarter</p>
                </div>
              </div>
            </AspectRatio>
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 text-sm text-muted-foreground">
            Visualize trends, spot anomalies, and make data-driven decisions
          </div>
        </motion.div>
      </div>
    </section>
  );
};
