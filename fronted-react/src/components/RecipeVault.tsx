import RecipeCard from "./RecipeCard";

const recipes = [
  {
    title: "Classic Pancakes",
    description: "Fluffy, golden pancakes served with maple syrup",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    category: "Breakfast",
    prepTime: "10 mins",
    cookTime: "15 mins",
    ingredients: [
      "1½ cups all-purpose flour",
      "3½ teaspoons baking powder",
      "¼ teaspoon salt",
      "1 tablespoon sugar",
      "1¼ cups milk",
      "1 egg",
      "3 tablespoons butter, melted"
    ],
    steps: [
      {
        step: 1,
        instruction: "In a large bowl, whisk together flour, baking powder, salt, and sugar."
      },
      {
        step: 2,
        instruction: "In another bowl, whisk together milk, egg, and melted butter."
      },
      {
        step: 3,
        instruction: "Pour wet ingredients into dry ingredients and whisk until just combined. Don't overmix."
      },
      {
        step: 4,
        instruction: "Heat a griddle or pan over medium heat. Pour ¼ cup batter for each pancake."
      },
      {
        step: 5,
        instruction: "Cook until bubbles form on surface, then flip and cook other side until golden brown."
      }
    ]
  },
  {
    title: "Quinoa Buddha Bowl",
    description: "Nutritious bowl with fresh vegetables and tahini dressing",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    category: "Lunch",
    prepTime: "15 mins",
    cookTime: "20 mins",
    ingredients: [
      "1 cup quinoa",
      "2 cups water",
      "1 sweet potato, cubed",
      "1 cup chickpeas",
      "2 cups kale",
      "1 avocado",
      "Tahini dressing"
    ],
    steps: [
      {
        step: 1,
        instruction: "Rinse quinoa and cook with water according to package instructions."
      },
      {
        step: 2,
        instruction: "Roast sweet potato cubes with olive oil at 400°F for 20 minutes."
      },
      {
        step: 3,
        instruction: "Massage kale with olive oil and a pinch of salt."
      },
      {
        step: 4,
        instruction: "Arrange quinoa, roasted sweet potatoes, chickpeas, and kale in bowls."
      },
      {
        step: 5,
        instruction: "Top with sliced avocado and drizzle with tahini dressing."
      }
    ]
  },
  {
    title: "Grilled Salmon",
    description: "Fresh salmon with lemon herb butter sauce",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    category: "Dinner",
    prepTime: "10 mins",
    cookTime: "12 mins",
    ingredients: [
      "4 salmon fillets",
      "2 tablespoons olive oil",
      "2 lemons",
      "4 tablespoons butter",
      "2 cloves garlic, minced",
      "Fresh herbs (dill, parsley)",
      "Salt and pepper"
    ],
    steps: [
      {
        step: 1,
        instruction: "Pat salmon dry and season with salt and pepper."
      },
      {
        step: 2,
        instruction: "Brush with olive oil and place on preheated grill skin-side up."
      },
      {
        step: 3,
        instruction: "Grill for 4-5 minutes, then flip and cook for another 3-4 minutes."
      },
      {
        step: 4,
        instruction: "Meanwhile, melt butter with garlic and herbs in a small pan."
      },
      {
        step: 5,
        instruction: "Serve salmon with lemon herb butter sauce and lemon wedges."
      }
    ]
  }
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