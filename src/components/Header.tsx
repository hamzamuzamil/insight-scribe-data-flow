
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-lg bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Templates
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link to="/app">Try Demo</Link>
          </Button>
          <Button asChild>
            <Link to="/app">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
