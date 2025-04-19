import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle, Plus, Loader2 } from "lucide-react";
import axios from "axios";

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Any"];
const dietPrefs = ["Vegetarian", "Vegan", "Gluten-Free", "Low-Carb"];
const cookingTimes = ["Any", "Under 15 minutes", "15–30 minutes", "30–60 minutes", "Over 1 hour"];

const RecipeRemix = () => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("Any");
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState("Any");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleDietaryPreference = (pref: string) => {
    setDietaryPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setSelectedRecipe(null);
    try {
      const response = await axios.post("http://127.0.0.1:8000/generate-recipe", {
        ingredients: ingredients.split(",").map((item) => item.trim()),
        meal_type: mealType,
        dietary_preferences: dietaryPreferences,
        cooking_time: cookingTime,
      });
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error("Error generating recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="remix" className="py-16 px-4 bg-surface-dark">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Recipe Remix</h2>
          <p className="text-secondary/80">
            Enter your ingredients, and filter preferences to generate tailored recipes.
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
              <label className="text-sm font-medium text-secondary">List your ingredients</label>
              <Input
                placeholder="e.g., chicken, rice, tomatoes, onions..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="h-24"
              />
            </div>

            <div className="space-y-2">
              <p className="font-medium text-secondary">Meal Type</p>
              <div className="flex flex-wrap gap-3">
                {mealTypes.map(type => (
                  <Button
                    key={type}
                    variant={mealType === type ? "default" : "outline"}
                    onClick={() => setMealType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-secondary">Dietary Preferences (Optional)</p>
              <div className="flex flex-wrap gap-3">
                {dietPrefs.map(pref => (
                  <Button
                    key={pref}
                    variant={dietaryPreferences.includes(pref) ? "default" : "outline"}
                    onClick={() => toggleDietaryPreference(pref)}
                  >
                    {pref}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-secondary">Cooking Time</p>
              <select
                className="w-full border rounded-md p-2 text-secondary bg-white"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
              >
                {cookingTimes.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleGenerateRecipe}
              className="w-full bg-primary hover:bg-primary-dark text-secondary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Generate Recipe
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {recipes.length > 0 && !selectedRecipe && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
    {recipes.map((recipe, index) => {
      // Split titles using a robust regex: matches "1. Title", "2. Title", etc.
      const titles = recipe.title.match(/\d+\.\s[^(\d+\.)]+/g) || [recipe.title];

      return titles.map((title: string, idx: number) => (
        <div
          key={`${index}-${idx}`}
          onClick={() => setSelectedRecipe(recipe)}
          className="cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-transform duration-200 hover:-translate-y-1 border border-primary/20 glass-effect"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-2">
                <span className="text-2xl font-bold text-[#ED9455]">
        {title.replace(/,$/, '').trim()}
      </span>

            <span className="text-sm text-gray-500">Tap to view recipe →</span>
          </div>
        </div>
      ));
    })}
  </div>
)}


        {selectedRecipe && (
          <Card className="max-w-3xl mx-auto mt-8 glass-effect">
            <CardHeader>
              <CardTitle className="text-center text-primary">
                {selectedRecipe.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Ingredients:</p>
                <ul className="list-disc ml-5 text-secondary/90">
                  {selectedRecipe.ingredients.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
               <p className="font-semibold">Instructions:</p>
                <div
                  className="text-secondary/90 space-y-2 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}
                />
                </div>


              <Button variant="outline" onClick={() => setSelectedRecipe(null)}>
                Back to Options
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default RecipeRemix;  