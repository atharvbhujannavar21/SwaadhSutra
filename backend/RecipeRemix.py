from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crewai import Crew, Agent, Task
from markdown import markdown
import os
# python -m uvicorn RecipeRemix:app --reload
os.environ["GROQ_API_KEY"] = "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"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:8080/remix"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IngredientRequest(BaseModel):
    ingredients: list[str]
    meal_type: str
    dietary_preferences: list[str]
    cooking_time: str

@app.post("/generate-recipe")
async def generate_recipe(req: IngredientRequest):
    ingredients = ", ".join(req.ingredients)
    preferences = ", ".join(req.dietary_preferences) if req.dietary_preferences else "None"

    dish_suggester = Agent(
        role="Recipe Expert",
        goal="Suggest dishes based on available ingredients and preferences.",
        backstory="A culinary expert who suggests dishes tailored to input.",
        llm="groq/llama3-8b-8192"
    )

    chef = Agent(
        role="Professional Chef",
        goal="Provide detailed recipes for chosen dishes.",
        backstory="An expert chef with step-by-step recipe instructions.",
        llm="groq/llama3-8b-8192"
    )

    task = Task(
        description=(
            f"Suggest 5 {req.meal_type.lower()} dishes that can be made with the following ingredients: {ingredients}. "
            f"Respect these dietary preferences: {preferences}. Limit cooking time to {req.cooking_time.lower()} if possible. "
            f"Return only a simple numbered list (1. Dish1, 2. Dish2, ...)."
        ),
        agent=dish_suggester,
        expected_output="A list of possible dishes."
    )

    crew = Crew(agents=[dish_suggester], tasks=[task])
    dish_response = crew.kickoff()

    import re
    matches = re.findall(r"\d+\.\s*(.+)", str(dish_response))
    dish_list = [match.strip() for match in matches]

    if not dish_list:
        return {"error": "No dishes could be generated."}

    recipes = []

    for dish in dish_list:
        recipe_task = Task(
            description=f"Give a detailed recipe for {dish}. Include ingredients, instructions, and estimated cooking time.",
            agent=chef,
            expected_output="A full recipe."
        )
        recipe_crew = Crew(agents=[chef], tasks=[recipe_task])
        recipe_output = recipe_crew.kickoff()

        # Convert Markdown to HTML for pretty rendering on frontend
        html_recipe = markdown(str(recipe_output).strip())

        recipes.append({
            "title": dish,
            "ingredients": req.ingredients,
            "instructions": html_recipe  # Now properly formatted for web
        })

    return {"recipes": recipes}