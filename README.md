# HRMS AI Suite

An AI-powered Human Resource Management System that streamlines recruitment, candidate evaluation, employee onboarding, workforce analytics, and role-based workforce monitoring through Google Gemini AI.

Built as a scalable full-stack HR platform with React, Node.js, Express, and Gemini 2.5 Flash.

## Problem Statement

Modern HR teams spend significant time manually screening resumes,
conducting candidate evaluations, answering repetitive onboarding
questions, and identifying employee attrition risks.

This project automates those workflows using Generative AI and
predictive analytics while providing a centralized HR management portal.

## Demo Video
[Watch Demo Video for the project](https://drive.google.com/file/d/1GA2-y6Qvpy7mdWA8iLHc_cyUTW3QSds7/view?usp=sharing)

## Features

### 1. AI Resume Screening

Automatically evaluates candidate resumes against job descriptions.

Capabilities:

- PDF Resume Upload
- PDF Job Description Upload
- Text-Based Resume Screening
- Gemini-Powered Skill Matching
- Fitment Score Generation
- Missing Skill Identification
- Shortlist(score >= 80) / Review (60 <= score < 80) and Reject (score < 60) Recommendation

Outputs:

- Fitment Score
- Matched Skills
- Missing Skills
- Candidate Summary

### 2. Smart Interview Evaluation

Evaluates candidate interview responses using AI.

Capabilities:

- Technical Question Simulation
- Voice Recording
- Audio Upload Support
- Audio-to-Text Transcription
- Technical Competency Scoring
- Communication Assessment
- AI Feedback Generation

Outputs:

- Technical Score
- Communication Score
- Detailed Feedback

### 3. AI Onboarding Copilot

Interactive HR chatbot for employees.

Capabilities:

- Company Policy Assistance
- HR FAQ Responses
- Onboarding Guidance
- Employee Support Chat

Powered by Google Gemini.

### 4. Predictive HR Analytics

Analyzes workforce metrics to identify retention risks.

Capabilities:

- Attrition Prediction
- Workforce Health Analysis
- Burnout Detection
- Risk Identification
- Retention Recommendations

Outputs:

- Turnover Risk Percentage
- Primary Risk Factor
- Mitigation Recommendation

### 5. Personalized Dashboard

Role-based dashboard simulation. (Basic Prototype vesion)

Supported Roles:

- Management Admin
- Senior Manager
- HR Recruiter
- Employee

Displays:

- Employee Metrics
- Workforce Statistics
- HR KPIs
- Role-Specific Insights

## System Architecture

```text
Frontend
├── Resume Screening UI
├── Interview Evaluation UI
├── Onboarding Copilot UI
├── Analytics Dashboard
└── Personalized Dashboard

Backend
├── AI Routes
├── File Upload Processing
├── PDF Parsing
├── Gemini Integration
└── Analytics Engine

AI Layer
│
└── Google Gemini 2.5 Flash

Storage Layer
│
└── In-Memory Database Simulation
```

## Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js

### AI

- Google Gemini 2.5 Flash
- Google GenAI SDK

### Libraries

- Multer
- PDF-Parse
- Dotenv
- CORS

### Storage

- In-Memory Data Structures

## Project Structure

```text
hrms_frontend/
│
├── src/
│ ├── App.js
│ ├── App.css
│ └── index.js
│
└── package.json


hrms_backend/
│
├── routes/
│ └── aiRoutes.js
│
├── aiService.js
├── server.js
├── .env
└── package.json
```

## Installation

### Clone Repository

```bash
git clone <repository-url>

cd hrms_backend
npm install

cd ../hrms_frontend
npm install
```

## Environment Variables

Create a `.env` file inside hrms_backend.

```js
GEMINI_API_KEY=YOUR_API_KEY
PORT=5000
```

## Running the Project

### Start Backend

```bash
cd hrms_backend

node server.js
```

#### Expected Output:
```bash
GEMINI KEY EXISTS: true
AI ROUTES FILE EXECUTED
FWC HRMS BACKEND SYSTEM STARTED SUCCESSFULLY
Server listening dynamically on port: 5000
```

### Start Frontend
```bash
cd hrms_frontend

npm start
```

View Frontend at `http://localhost:3000` and backend starts at `http://localhost:5000`

## API Documentation

### Resume Screening via PDF
```jsx 
POST /api/ai/screen-resume-file
```

### Resume Screening via text
```jsx 
POST /api/ai/screen-resume
```

#### Request
```json
{
  "resumeText": "Candidate resume",
  "jobDescription": "Target JD"
}
```

#### Response
```json
{
  "success": true,
  "evaluation": {
    "fitmentScore": 85,
    "matchedSkills": ["React", "Node.js"],
    "missingSkills": ["AWS"],
    "summary": "Strong candidate."
  }
}
```

### Interview Evaluation
```jsx
POST /api/ai/evaluate-interview
```

#### Request
```json
{
  "question": "...",
  "candidateAnswer": "..."
}
```

#### Audio Transcription
```jsx
POST /api/ai/transcribe-audio
```

converts: `audio -> WEBM`

### Onboarding Copilot
```jsx 
POST /api/ai/onboarding-chat
```

### Predictive Analysis
```jsx 
POST /api/ai/predict-analytics
```

## AI Processing Pipeline

### Resume Screening
```text
Resume
   ↓
PDF Parsing
   ↓
Gemini Evaluation
   ↓
JSON Output
   ↓
Fitment Report
```

### Interview Evaluation
```text
Audio
   ↓
Transcription
   ↓
Gemini Analysis
   ↓
Scoring
   ↓
Feedback Report
```

## Scalability Considerations

The application is designed with scalability principles:

- Modular Express Routes
- Dedicated AI Service Layer
- Separation of Frontend and Backend
- Reusable API Architecture
- Stateless Request Processing
- Cloud Deployment Ready
- Supports Future Database Integration

Current implementation uses an in-memory database simulation
for demonstration purposes.


## Future Enhancements

- Video Interview Analysis
- Real-Time Sentiment Detection
- Multi-Language Support
- PostgreSQL Integration
- Employee Performance Tracking
- Leave Management Module
- Attendance Monitoring
- Authentication & RBAC
- Cloud Deployment

---
### Submitted by: Ayushi Gupta
