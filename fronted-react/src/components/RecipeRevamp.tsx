import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3, Plus, Loader2 } from "lucide-react";
import axios from "axios";

const RecipeRevamp = () => {
  const [recipe, setRecipe] = useState("");
  const [revamped, setRevamped] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRevampRecipe = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/revamp-recipe", {
        recipe,
      });
      setRevamped(response.data.revamped_recipe);
    } catch (error) {
      console.error("Error revamping recipe:", error);
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-secondary"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Revamping...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Get Improvement Suggestions
                </>
              )}
            </Button>

            {revamped && (
              <div
                className="prose max-w-none mt-6 bg-white p-4 rounded-lg border border-primary/10"
                dangerouslySetInnerHTML={{ __html: revamped }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RecipeRevamp;
