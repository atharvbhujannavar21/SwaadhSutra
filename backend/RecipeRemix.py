import os
import logging
from crewai import Crew, Agent, Task

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

os.environ["GROQ_API_KEY"] = "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"

def get_ingredients():
    print("\n🍽️ Enter ingredients you have (comma-separated):")
    return input("> ").strip()

def create_agents():
    dish_suggester = Agent(
        role="Recipe Expert",
        goal="Suggest dishes based on available ingredients.",
        backstory="A culinary expert who suggests the best dish ideas.",
        llm="groq/llama3-8b-8192"
    )

    chef = Agent(
        role="Professional Chef",
        goal="Provide detailed recipes for chosen dishes.",
        backstory="An expert chef specializing in easy-to-follow recipes.",
        llm="groq/llama3-8b-8192"
    )

    return dish_suggester, chef

def create_tasks(agent, description):
    return [Task(description=description, agent=agent, expected_output="A list of possible dishes.")]

def chat():
    dish_suggester, chef = create_agents()
    ingredients = get_ingredients()
    
    tasks = create_tasks(dish_suggester, f"Suggest 5 dishes that can be made with: {ingredients}. Return only a simple numbered list (1. Dish1, 2. Dish2, ...).")
    
    #  Run Crew for Dish Suggestion
    crew = Crew(agents=[dish_suggester], tasks=tasks)
    output = crew.kickoff()  # Run CrewAI



    # Extract AI-generated response
    ai_response = str(output).strip()  # ✅ Correct
  # ✅ Correct

    # DEBUGGING: Print the raw CrewAI output

    # Step 3: Extract dishes from response
    dish_list = [dish.strip() for dish in ai_response.split(", ") if dish.strip()]  # ✅ Fix applied
    dish_list = [dish.split(". ", 1)[-1].strip() for dish in dish_list]  # ✅ Removes numbering


    if not dish_list:
        print("❌ No dishes could be generated. Try using different ingredients.")
        return

    print("\n🍽️ Here are some dishes you can make:\n")
    for idx, dish in enumerate(dish_list, 1):
        print(f"{idx}. {dish}")

    # Step 4: Let User Select a Dish
    selected_index = input("\n👨‍🍳 Select a dish number from the list: ").strip()
    
    try:
        selected_dish = dish_list[int(selected_index) - 1]  # Extract selected dish
    except (IndexError, ValueError):
        print("❌ Invalid selection. Please enter a valid number.")
        return

    # Step 5: Create Task for Generating Recipe
    recipe_task = create_tasks(chef, f"Provide a detailed step-by-step recipe for {selected_dish}. Include ingredients, instructions, and cooking time.")
    
    # Step 6: Run Crew for Recipe Generation
    recipe_crew = Crew(agents=[chef], tasks=recipe_task)
    recipe_output = recipe_crew.kickoff()

    # ✅ FIXED: Extract AI response properly
    print(f"\n📖 Recipe for {selected_dish}:\n")
    print(str(recipe_output).strip())  

    print("\n👩‍🍳 Enjoy your meal!")

# ✅ Run Chat Function
if __name__ == "__main__":
    chat()
