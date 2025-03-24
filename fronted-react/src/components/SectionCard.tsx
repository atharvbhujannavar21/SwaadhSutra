
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SectionCardProps {
  title: string;
  description: string;
  image: string;
  imagePosition: "left" | "right";
  route: string;
  icon: React.ReactNode;
}

const SectionCard = ({ title, description, image, imagePosition, route, icon }: SectionCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${route}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 py-16 animate-fadeIn">
      {imagePosition === "left" && (
        <div className="w-full md:w-1/2">
          <img 
            src={image} 
            alt={title} 
            className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[400px] object-cover"
          />
        </div>
      )}
      
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <div className="inline-flex items-center space-x-2 text-primary mb-4">
          {icon}
          <h2 className="text-3xl font-bold text-secondary">{title}</h2>
        </div>
        <p className="text-secondary/70 text-lg leading-relaxed">
          {description}
        </p>
        <Button 
          onClick={handleClick}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          Explore {title}
        </Button>
      </div>

      {imagePosition === "right" && (
        <div className="w-full md:w-1/2">
          <img 
            src={image} 
            alt={title} 
            className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[400px] object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default SectionCard;
