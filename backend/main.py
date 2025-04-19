# main.py (combined backend)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crewai import Agent, Task, Crew
from markdown import markdown
import os

app = FastAPI()

# Configure CORS once for all endpoints
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shared Groq config
os.environ["GROQ_API_KEY"] = "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"

# --- Recipe Revamp ---
class RecipeInput(BaseModel):
    recipe: str

@app.post("/revamp-recipe")
async def revamp_recipe(input: RecipeInput):
    improver = Agent(
        role="Recipe Improver",
        goal="Improve recipes creatively and practically",
        llm="groq/llama3-8b-8192"
    )
    task = Task(
        description=f"Improve this recipe:\n{input.recipe}",
        agent=improver
    )
    crew = Crew(agents=[improver], tasks=[task])
    result = crew.kickoff()
    return {"revamped_recipe": markdown(str(result))}

# --- Recipe Remix ---
class RemixRequest(BaseModel):
    ingredients: list[str]
    meal_type: str
    dietary_preferences: list[str]
    cooking_time: str

@app.post("/remix-recipe")  # Different endpoint name!
async def remix_recipe(req: RemixRequest):
    remixer = Agent(
        role="Recipe Remixer",
        goal="Generate recipe variations",
        llm="groq/llama3-8b-8192"
    )
    task = Task(
        description=f"Remix these ingredients: {req.ingredients}",
        agent=remixer
    )
    crew = Crew(agents=[remixer], tasks=[task])
    result = crew.kickoff()
    return {"remixed_recipes": markdown(str(result))}