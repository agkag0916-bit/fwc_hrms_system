const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Memory storage for handling text/file streaming quickly
const { 
  screenResume, 
  evaluateInterview, 
  onboardingCopilot, 
  predictTurnoverRisk 
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
router.get("/test-file-route", (req, res) => {
  res.send("working");
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
  try {
    const { question, candidateAnswer } = req.body;
    const evaluation = await evaluateInterview(question, candidateAnswer);
    res.json({ success: true, evaluation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

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

module.exports = router;