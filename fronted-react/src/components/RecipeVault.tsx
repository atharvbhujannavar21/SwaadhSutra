
import RecipeCard from "./RecipeCard";

const recipes = [
  {
    title: "Classic Pancakes",
    description: "Fluffy, golden pancakes served with maple syrup",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    category: "Breakfast"
  },
  {
    title: "Quinoa Buddha Bowl",
    description: "Nutritious bowl with fresh vegetables and tahini dressing",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    category: "Lunch"
  },
  {
    title: "Grilled Salmon",
    description: "Fresh salmon with lemon herb butter sauce",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    category: "Dinner"
  },
];

const RecipeVault = () => {
  return (
    <section id="vault" className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Recipe Vault</h2>
          <p className="text-secondary/70 max-w-2xl mx-auto">
            Discover our curated collection of delicious recipes, from quick breakfasts to gourmet dinners
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} {...recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeVault;
