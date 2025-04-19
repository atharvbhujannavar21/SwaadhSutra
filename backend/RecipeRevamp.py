from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crewai import Agent, Task, Crew
from markdown import markdown
import os

# Load Groq API Key (you can use dotenv as well)
os.environ["GROQ_API_KEY"] = "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"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080/"],  # Update if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecipeInput(BaseModel):
    recipe: str

@app.post("/revamp-recipe")
async def revamp_recipe(input: RecipeInput):
    improver = Agent(
        role="Recipe Improver",
        goal="Improve and elevate recipes creatively and practically.",
        backstory="A culinary artist with a flair for creativity and health-conscious upgrades.",
        llm="groq/llama3-8b-8192"
    )

    task = Task(
        description=f"Improve the following recipe:\n{input.recipe}\nSuggest enhancements in flavor, health, or presentation.",
        agent=improver,
        expected_output="A revised version of the recipe with suggested changes."
    )

    crew = Crew(agents=[improver], tasks=[task])
    result = crew.kickoff()

    html = markdown(str(result))
    return {"revamped_recipe": html}
