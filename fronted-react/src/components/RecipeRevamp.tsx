
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3, Plus } from "lucide-react";

const RecipeRevamp = () => {
  const [recipe, setRecipe] = useState("");

  const handleRevampRecipe = () => {
    // TODO: Implement AI recipe improvement suggestions
    console.log("Revamping recipe:", recipe);
  };

  return (
    <section id="revamp" className="py-16 px-4 bg-surface">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Recipe Revamp</h2>
          <p className="text-secondary/80">
            Share your recipe, and we'll suggest creative improvements to elevate your dish.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Edit3 className="h-6 w-6 text-primary" />
              Recipe Enhancement Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="recipe" className="text-sm font-medium text-secondary">
                Enter your recipe
              </label>
              <Textarea
                id="recipe"
                placeholder="Paste your recipe here..."
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            <Button 
              onClick={handleRevampRecipe}
              className="w-full bg-primary hover:bg-primary-dark text-secondary"
            >
              <Plus className="h-5 w-5" />
              Get Improvement Suggestions
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RecipeRevamp;
