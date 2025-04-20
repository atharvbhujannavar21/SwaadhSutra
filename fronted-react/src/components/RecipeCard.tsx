import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ListOrdered } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

interface RecipeStep {
  step: number;
  instruction: string;
}

interface RecipeCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  steps: RecipeStep[];
  ingredients: string[];
  prepTime: string;
  cookTime: string;
}

const RecipeCard = ({ title, description, image, category, steps, ingredients, prepTime, cookTime }: RecipeCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
            <Button 
              variant="outline" 
              className="hover:bg-primary hover:text-white"
              onClick={() => setIsOpen(true)}
            >
              View Recipe
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            <DialogDescription className="text-secondary/70">{description}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Prep time: {prepTime}</span>
              <span>Cook time: {cookTime}</span>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <ListOrdered className="h-5 w-5" />
                Instructions
              </h3>
              <ol className="space-y-4">
                {steps.map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <span className="font-medium text-primary">{step.step}.</span>
                    <span>{step.instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecipeCard;