
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChefHat, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Recipe Vault", path: "/vault" },
    { name: "Recipe Remix", path: "/remix" },
    { name: "Recipe Revamp", path: "/revamp" },
  ];

  const navigateToPath = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border/50 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigateToPath("/")}>
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-secondary">SwadSutra</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigateToPath(item.path)}
                className="text-secondary/80 hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
