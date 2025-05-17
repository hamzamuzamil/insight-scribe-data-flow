
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GalleryHorizontal } from "lucide-react";

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

        <div className="relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-70"></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl text-gradient mb-6">
            Upload your data. Discover the truth.
          </h1>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          ProReporter turns your raw data into actionable insights with AI-powered analytics.
          Ask natural language questions and get instant answers and visualizations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button asChild size="lg" className="px-8 shadow-glow-primary">
            <Link to="/app">
              Get Started for Free
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/templates">
              <GalleryHorizontal className="mr-2 h-4 w-4" />
              View Templates
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 w-full max-w-5xl mx-auto relative">
          <div className="rounded-xl overflow-hidden border border-white/10 glass shadow-2xl transform-gpu hover:scale-[1.01] transition-all duration-500">
            <AspectRatio ratio={16/9} className="bg-gradient-to-br from-primary/5 to-purple-500/5">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                alt="ProReporter Dashboard Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
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
        </div>
      </div>
    </section>
  );
};
