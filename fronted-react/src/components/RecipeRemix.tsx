
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle, Plus } from "lucide-react";

const RecipeRemix = () => {
  const [ingredients, setIngredients] = useState("");

  const handleGenerateRecipe = () => {
    // TODO: Implement AI recipe generation
    console.log("Generating recipe with ingredients:", ingredients);
  };

  return (
    <section id="remix" className="py-16 px-4 bg-surface-dark">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Recipe Remix</h2>
          <p className="text-secondary/80">
            Enter your available ingredients, and let our AI suggest creative recipes just for you.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Shuffle className="h-6 w-6 text-primary" />
              Ingredient-Based Recipe Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="ingredients" className="text-sm font-medium text-secondary">
                List your ingredients
              </label>
              <Input
                id="ingredients"
                placeholder="e.g., chicken, rice, tomatoes, onions..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="h-24"
              />
            </div>
            <Button 
              onClick={handleGenerateRecipe}
              className="w-full bg-primary hover:bg-primary-dark text-secondary"
            >
              <Plus className="h-5 w-5" />
              Generate Recipe
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RecipeRemix;
