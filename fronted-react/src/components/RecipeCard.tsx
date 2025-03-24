
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface RecipeCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
}

const RecipeCard = ({ title, description, image, category }: RecipeCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fadeIn">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 right-2 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
          {category}
        </span>
      </div>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Button variant="outline" className="hover:bg-primary hover:text-white">
            View Recipe
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
