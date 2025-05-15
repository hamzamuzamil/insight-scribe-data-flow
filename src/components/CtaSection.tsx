
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CtaSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-5xl mx-auto glass rounded-2xl p-8 md:p-16 text-center overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gradient relative z-10">
            Ready to unlock insights from your data?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 relative z-10">
            Stop staring at spreadsheets and start understanding your data. 
            No coding required - just upload and ask.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button asChild size="lg" className="px-8">
              <Link to="/app">Get Started Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
