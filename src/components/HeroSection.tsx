
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl text-gradient mb-6">
          Upload your data. Discover the truth.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          ProReporter turns your raw data into actionable insights with AI-powered analytics.
          Ask natural language questions and get instant answers and visualizations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button asChild size="lg" className="px-8">
            <Link to="/app">
              Get Started for Free
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/">
              View Templates
            </Link>
          </Button>
        </div>
        <div className="mt-16 w-full max-w-5xl mx-auto relative">
          <div className="aspect-[16/9] rounded-lg overflow-hidden border border-white/10 glass shadow-2xl">
            <img 
              src="/placeholder.svg"
              alt="ProReporter Dashboard Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 text-sm text-muted-foreground">
            Visualize trends, spot anomalies, and make data-driven decisions
          </div>
        </div>
      </div>
    </section>
  );
};
