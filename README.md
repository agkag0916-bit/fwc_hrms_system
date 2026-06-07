# FWC HRMS Portal – AI-Powered Human Resource Management System

## Overview
FWC HRMS Portal is an AI-powered Human Resource Management System built using React, Node.js, Express, and Google Gemini. The platform automates recruitment, onboarding, interview evaluation, workforce analytics, and role-based dashboarding.

## Features Implemented

### 1. AI Resume Screening
- Resume PDF upload
- Job Description PDF upload
- Manual text input support
- AI fitment scoring
- Matched skills identification
- Missing skills detection
- Candidate summary generation
- Hiring recommendation workflow

### 2. Smart Interview Evaluation
- Technical interview question assessment
- AI scoring of candidate responses
- Technical competency evaluation
- Communication score generation
- Strength analysis
- Improvement recommendations
- Structured AI feedback

### 3. Audio Interview Support
- Browser microphone access
- Audio recording using MediaRecorder API
- Audio upload to backend
- Transcription endpoint integration
- AI-based transcript processing

### 4. AI Onboarding Copilot
- Conversational HR assistant
- Employee onboarding guidance
- Policy and process support
- Session-based chat history
- Real-time AI responses

### 5. Predictive HR Analytics
- Workforce metrics analysis
- Turnover risk prediction
- Burnout indicator analysis
- Attrition recommendations
- AI-generated workforce insights

### 6. Personalized Dashboard
Role-specific dashboards for:
- Administrator
- HR Recruiter
- Manager
- Employee

Dashboard metrics include:
- Employee statistics
- Active users
- Open positions
- Candidate pipeline
- Team analytics
- Attendance metrics
- Attrition indicators
- Training progress

## Technology Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Fetch API

### Backend
- Node.js
- Express.js
- Multer
- PDF Parsing
- Google Gemini SDK

## API Endpoints

### Resume Screening
POST /api/ai/screen-resume

### Resume Screening (PDF Upload)
POST /api/ai/screen-resume-file

### Interview Evaluation
POST /api/ai/evaluate-interview

### Audio Transcription
POST /api/ai/transcribe-audio

### Onboarding Assistant
POST /api/ai/onboarding-chat

### Predictive Analytics
POST /api/ai/predict-analytics

### Personalized Dashboard
GET /api/ai/dashboard/:role

## AI Capabilities
Powered by Google Gemini 2.5 Flash for:
- Resume evaluation
- Interview assessment
- Audio transcription
- Onboarding assistance
- Predictive analytics

## Scalability Considerations
Current implementation:
- In-memory architecture
- Modular backend routes
- API-driven frontend

Future enhancements:
- PostgreSQL
- MongoDB
- Redis
- JWT Authentication
- Docker
- Kubernetes
- CI/CD

## Security
Implemented:
- Environment variable configuration
- Backend API isolation
- Input validation

Planned:
- Authentication
- Authorization
- Rate limiting
- Audit logging

## Project Highlights
- AI Resume Screening
- AI Interview Evaluation
- Audio Interview Processing
- AI Onboarding Assistant
- Predictive HR Analytics
- Personalized Dashboards
- Modular Architecture
- Scalable Design

## Conclusion
FWC HRMS Portal demonstrates practical enterprise AI integration across recruitment, onboarding, workforce analytics, and employee engagement workflows.
