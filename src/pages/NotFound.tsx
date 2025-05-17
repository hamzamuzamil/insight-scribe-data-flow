
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Update page title for SEO
    document.title = "Page Not Found | ProReporter";
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-30" />
      </div>
      
      <AnimatePresence>
        <motion.div 
          className="text-center z-10 glass p-10 rounded-xl max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold mb-4 text-gradient">404</h1>
          </motion.div>
          
          <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
          
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/app">Go to Dashboard</Link>
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NotFound;
