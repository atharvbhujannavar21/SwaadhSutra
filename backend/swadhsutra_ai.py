import os
import time
import logging
from crewai import Crew, Agent, Task

# Setup logging for debugging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

# ✅ Function to set API Key safely
def set_api_key():
    api_key = "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"  # Replace with your actual key
    if not api_key:
        logging.error("GROQ API key is missing. Please set it before running the script.")
        exit(1)
    os.environ["GROQ_API_KEY"] = api_key
    logging.info("✅ GROQ API Key set successfully.")

# ✅ Function to handle rate limits (Retries on Failure)
def call_with_retry(crew):
    max_retries = 3  # Number of retries before giving up
    wait_time = 10  # Initial wait time in seconds

    for attempt in range(max_retries):
        try:
            logging.info(f"🚀 Attempt {attempt + 1}: Generating Recipe...\n")
            result = crew.kickoff()
            return result  # Success, return the result

        except Exception as e:
            error_message = str(e)

            # Check if it's a rate limit error
            if "Rate limit reached" in error_message:
                logging.warning(f"⚠ Rate limit hit! Waiting {wait_time} seconds before retrying...")
                time.sleep(wait_time)  # Wait and retry
                wait_time *= 2  # Exponential backoff (10s → 20s → 40s)
            else:
                logging.error(f"❌ Error: {error_message}")
                break  # If it's a different error, exit the loop

    return "❌ Failed to generate recipe after multiple attempts."

# ✅ Function to get user preferences
def get_user_preferences():
    print("\nChoose a recipe variation:")
    print("1. Regular")
    print("2. Gluten-Free")
    print("3. Spicy")
    
    choice = input("Enter the number of your choice: ").strip()
    
    if choice == "1":
        return "Regular"
    elif choice == "2":
        return "Gluten-Free"
    elif choice == "3":
        return "Spicy"
    else:
        print("Invalid choice! Defaulting to Regular.")
        return "Regular"

# ✅ Function to create AI agents
def create_agents():
    chef = Agent(
        role="Professional Chef",
        goal="Provide step-by-step recipes efficiently.",
        backstory="A skilled chef who creates optimized recipes.",
        verbose=True,
        allow_delegation=False,
        llm="groq/llama3-8b-8192"  
    )

    assistant_chef = Agent(
        role="Assistant Chef",
        goal="Refine recipes by making them simpler and adaptable.",
        backstory="A young chef learning to enhance recipes for all.",
        verbose=True,
        allow_delegation=False,
        llm="groq/llama3-8b-8192"  
    )

    return chef, assistant_chef

# ✅ Function to define tasks
def create_tasks(chef, assistant_chef, user_choice):
    chef_task = Task(
        description=f"Create a structured {user_choice} Margherita pizza recipe with:\n"
                    "- A clear and well-organized ingredient list.\n"
                    "- Step-by-step instructions for dough, sauce, and toppings.\n"
                    "- Cooking method details specific to {user_choice}.\n"
                    "- Baking time, temperature, and handling tips.\n"
                    "- Alternative ingredient substitutions if needed.",
        agent=chef,
        expected_output="A detailed, well-structured recipe optimized for flavor and ease of execution."
    )

    assistant_task = Task(
        description=f"Review and enhance the {user_choice} Margherita pizza recipe by:\n"
                    "- Improving clarity and simplifying complex steps.\n"
                    "- Suggesting better ingredient combinations for enhanced taste.\n"
                    "- Adding chef tips for texture, crispiness, and flavor balance.\n"
                    "- Ensuring the recipe is beginner-friendly and easy to follow.\n"
                    "- Providing additional variations (spicier, cheesier, etc.).",
        agent=assistant_chef,
        expected_output="A refined version of the recipe with expert tips and improved clarity."
    )

    return [chef_task, assistant_task]

# ✅ Function to execute AI process
def run_crew():
    set_api_key()
    
    # Get user preferences
    user_choice = get_user_preferences()
    
    # Create agents
    chef, assistant_chef = create_agents()
    
    # Assign tasks based on user choice
    tasks = create_tasks(chef, assistant_chef, user_choice)
    
    # Create Crew
    crew = Crew(agents=[chef, assistant_chef], tasks=tasks)
    
    # Call Crew with Retry Mechanism
    result = call_with_retry(crew)
    
    logging.info("✅ Recipe generation completed.\n")
    
    return result, user_choice

# ✅ Main Execution
if __name__ == "__main__":
    final_recipe, user_choice = run_crew()
    print("\n🍕 Final Recipe:\n")
    print(final_recipe)  # Output in terminal only
