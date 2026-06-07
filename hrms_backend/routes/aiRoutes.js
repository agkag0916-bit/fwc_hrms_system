const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Memory storage for handling text/file streaming quickly
const { 
  screenResume, 
  evaluateInterview, 
  onboardingCopilot, 
  predictTurnoverRisk,
  transcribeAudio
} = require('../aiService');

console.log("AI ROUTES FILE EXECUTED");
// 1. Endpoint for Resume Screening (Cleaned to receive standard JSON data)[cite: 1]
router.post('/screen-resume', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    // Safety check to prevent hanging if inputs are blank
    if (!resumeText || !jobDescription) {
      return res.status(400).json({ success: false, error: "Inputs cannot be empty" });
    }
    const evaluation = await screenResume(resumeText, jobDescription);
    res.json({ success: true, evaluation });
  } catch (error) {
        console.error("Gemini Route Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post(
  "/screen-resume-file",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jd", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
        const pdfParse = require("pdf-parse");
        
        const resumeBuffer = req.files.resume[0].buffer;
        const jdBuffer = req.files.jd[0].buffer;

        const resumeData = await pdfParse(resumeBuffer);
        const jdData = await pdfParse(jdBuffer);

        const evaluation = await screenResume(
            resumeData.text,
            jdData.text
        );

        res.json({
            success: true,
            evaluation
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
    }
);

// 2. Endpoint for Interview Evaluation

router.post('/evaluate-interview', async (req, res) => {
    console.log("EVALUATE INTERVIEW ROUTE HIT");

    try {
        const { question, candidateAnswer } = req.body;

        console.log("QUESTION:", question);
        console.log("ANSWER:", candidateAnswer);

        const evaluation = await evaluateInterview(
            question,
            candidateAnswer
        );

        res.json({
            success: true,
            evaluation
        });
  } catch (error) {
    console.error("INTERVIEW ERROR:");
    console.error(error);

    res.status(500).json({
        success: false,
        error: error.message
    });
    }
});

router.post(
    "/transcribe-audio",
    upload.single("audio"),
    async (req, res) => {
        console.log("TRANSCRIBE ROUTE HIT");
        console.log(req.file);

        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: "No audio uploaded"
                });
            }

            const transcript = await transcribeAudio(
                req.file.buffer
            );

            res.json({
                success: true,
                transcript
            });
        } catch (err) {
            console.error(
                "TRANSCRIPTION ERROR:",
                err
            );
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }
);

// 3. Endpoint for Onboarding Chatbot
router.post('/onboarding-chat', async (req, res) => {
    try {
        const { question } = req.body;
        const answer = await onboardingCopilot(question);
        res.json({ success: true, answer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 4. Endpoint for Predictive Analytics
router.post('/predict-analytics', async (req, res) => {
    try {
        const { metricsSummary } = req.body;
        const analytics = await predictTurnoverRisk(metricsSummary);
        res.json({ success: true, analytics });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 5. Personalized Dashboard
router.get("/dashboard/:role", (req,res)=>{
    const role = req.params.role;
    
    if(role === "recruiter"){
        return res.json({
            openPositions:12,
            applications:284,
            shortlisted:67,
            interviews:23
        });
    }

    if(role === "manager"){
        return res.json({
            teamSize:18,
            attendanceRate:"96%",
            attritionRisk:"Medium",
            pendingReviews:4
        });
    }

    if(role === "employee"){
        return res.json({
            leaveBalance:12,
            holidays:3,
            trainingProgress:"78%"
        });
    }

    if(role === "admin"){
        return res.json({
            totalEmployees:5000,
            activeUsers:4872,
            departments:14,
            retentionRate:"92%"
        });
    }

    res.status(404).json({
        error:"Invalid role"
    });
});

module.exports = router;