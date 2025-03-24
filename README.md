# SwadhSutra

SwadhSutra is a **CrewAI-powered generative AI recipe builder** that helps users create recipes based on the ingredients they have. Users can also catalog their own recipes in a personal library for future reference. The project is built using **FastAPI** for the backend, a **React** frontend, and **MongoDB** for storing user data.

## Features

- **AI-Powered Recipe Suggestions**: Enter ingredients you have, and the AI will suggest dishes you can prepare.
- **Personal Recipe Library**: Save and manage your own recipes.
- **FastAPI Backend**: Efficient and lightweight API for handling requests.
- **React Frontend**: Interactive and user-friendly interface.
- **MongoDB Database**: Store user recipes and preferences securely.

## Tech Stack

- **Frontend**: React.js
- **Backend**: FastAPI
- **Database**: MongoDB
- **AI Model**: CrewAI Generative AI

## Installation

### Prerequisites
Make sure you have the following installed:
- Python 3.8+
- Node.js & npm
- MongoDB

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/atharvbhujannavar21/swadhsutra.git
cd swadhsutra/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## API Endpoints
| Method | Endpoint      | Description               |
|--------|-------------|---------------------------|
| GET    | /recipes    | Get all stored recipes    |
| POST   | /generate   | Generate a recipe from ingredients |
| POST   | /save       | Save a user recipe       |

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.

---
### 🚀 Happy Cooking with SwadhSutra! 🎉

