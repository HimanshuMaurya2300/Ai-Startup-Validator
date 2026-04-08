# AI Startup Validator

An AI-powered web application that validates startup ideas by providing comprehensive market analysis, competitor research, risk assessment, and profitability scoring using advanced AI models.

## Features

- **AI-Powered Analysis** - Get instant insights on your startup concept powered by Claude AI
- **Market Insights** - Understand target market size, trends, and growth opportunities
- **Competitor Analysis** - Identify key competitors and their market positioning
- **Profitability Scoring** - Receive a comprehensive data-driven profitability assessment (0-100)
- **PDF Reports** - Download detailed validation reports for offline reference
- **Dashboard Management** - View, manage, and track all your validated ideas

## Tech Stack

**Frontend**
- React 19 with Vite
- Tailwind CSS
- React Router DOM
- jsPDF for PDF generation
- React Toast for notifications

**Backend**
- Node.js with Express
- MongoDB with Mongoose
- OpenRouter API (Claude AI)

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- OpenRouter API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-startup-validator
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Configuration

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/startup-validator
OPENROUTER_API_KEY=your_openrouter_api_key
SITE_URL=http://localhost:3000
```

**Getting an OpenRouter API Key:**
1. Sign up at [OpenRouter](https://openrouter.ai/)
2. Navigate to API Keys section
3. Generate a new API key
4. Add credits to your account for API usage

## Running the Application

### Development Mode

**Start the backend server:**
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5000

**Start the frontend development server:**
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:5173

### Production Build

```bash
cd frontend
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ideas` | Submit a new startup idea for validation |
| GET | `/api/ideas` | Get all validated ideas |
| GET | `/api/ideas/:id` | Get a specific idea with its report |
| DELETE | `/api/ideas/:id` | Delete an idea |

### Example Request

```bash
POST /api/ideas
Content-Type: application/json

{
  "title": "AI-Powered Recipe Generator",
  "description": "A personalized meal planning app using AI to suggest recipes based on dietary preferences and available ingredients."
}
```

## AI Report Structure

The AI generates a comprehensive report containing:

- **problem** - The core problem the startup solves
- **customer** - Target customer segments
- **market** - Market size and opportunities
- **competitor** - Array of 3 key competitors
- **tech_stack** - Recommended technology stack
- **risk_level** - Low/Medium/High risk assessment
- **profitability_score** - 0-100 profitability rating
- **justification** - Detailed reasoning for the analysis

## Project Structure

```
ai-startup-validator/
├── backend/
│   ├── index.js           # Express server entry point
│   ├── models/
│   │   └── Idea.js        # Mongoose schema
│   ├── routes/
│   │   └── ideaRoutes.js  # API routes
│   ├── utils/
│   │   └── ai.js          # OpenRouter AI integration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx        # Landing page with idea submission
│   │   │   ├── Dashboard.jsx   # Ideas management
│   │   │   └── IdeaDetail.jsx  # Full report view
│   │   └── App.jsx        # Main app component
│   └── package.json
└── README.md
```

## Screenshots

The application features a modern dark-themed UI with:
- Gradient backgrounds and glowing effects
- Responsive card-based layouts
- Animated loading states
- Color-coded risk and profitability indicators

## License

ISC
