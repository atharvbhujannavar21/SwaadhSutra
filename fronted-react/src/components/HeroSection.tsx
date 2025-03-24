
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-surface to-surface/50 pt-16 transition-all duration-300">
      <div className="container mx-auto px-4 text-center">
        <div className={`transition-all duration-300 ${scrolled ? 'scale-75 opacity-80' : 'scale-100'}`}>
          <div className="inline-flex items-center justify-center space-x-2 mb-6 animate-fadeIn">
            <ChefHat className="h-16 w-16 text-primary" />
            <span className="text-2xl font-medium px-4 py-2 rounded-full bg-primary/10 text-primary">
              Welcome to SwadSutra
            </span>
          </div>
          
          <h1 className="text-8xl md:text-[120px] font-bold text-secondary mb-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            SwadSutra
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Your Personal
            <span className="text-primary block mt-2">Kitchen Genius</span>
          </h2>
          
          <p className="text-secondary/70 text-xl max-w-3xl mx-auto mb-12 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            Discover a world of culinary possibilities with SwadSutra. From traditional recipes to AI-powered cooking suggestions,
            we're here to make your cooking journey extraordinary. Explore our recipe vault, remix ingredients into new dishes,
            or revamp your existing recipes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
            <Button 
              className="bg-primary hover:bg-primary-dark text-white min-w-[180px] text-lg py-6"
              onClick={() => document.getElementById('sections')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
