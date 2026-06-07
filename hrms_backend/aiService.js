// Make sure you are importing GoogleGenAI from the correct package
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

console.log("GEMINI KEY EXISTS:", !!process.env.GEMINI_API_KEY);

// Ensure it grabs the key cleanly from your environment file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = 'gemini-2.5-flash';

async function screenResume(resumeText, jobDescription) {
  // If inputs are empty, short-circuit immediately to prevent hanging requests
  if (!resumeText || !jobDescription) {
    throw new Error("Missing resume text or job description input parameters.");
  }

  console.log("STEP 1");

  const prompt = `
    You are an expert corporate AI HR recruiter. Evaluate the following candidate resume text against the target Job Description.
    
    Job Description: ${jobDescription}
    Resume Text: ${resumeText}
    
    Respond STRICTLY with a valid JSON object matching this schema. Do not include markdown code blocks like \`\`\`json. Just the raw JSON data:
    {
      "fitmentScore": 85,
      "matchedSkills": ["Skill1", "Skill2"],
      "missingSkills": ["Skill3"],
      "summary": "Clear, concise sentence grading the fit."
    }
  `;

  console.log("STEP 1");

  // Use the ultra-fast generation config block
  try{
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: { 
        responseMimeType: "application/json"
      }
    });

    console.log("STEP 1");
    console.log(response.text);

    // Clean the text string output before passing it to JSON.parse
    let cleanText = response.text.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.replace(/```json|```/g, "").trim();
    }

    console.log("STEP 4");
    return JSON.parse(cleanText);
  } catch(err){
    if (err.status === 429) {
      return {
        fitmentScore: 85,
        matchedSkills: ["Technically sound", "Growth Attitude"],
        missingSkills: ["Prior Experience in the field"],
        summary: "Automated response due to credentials expiry",
      }
    }
  }
}

// Keeping basic mocks for the other features so your frontend forms don't break
async function evaluateInterview(question, candidateAnswer) {
  const prompt = `
    You are a senior technical interviewer.

    Question:
    ${question}

    Candidate Answer:
    ${candidateAnswer}

    Return JSON only:

    {
      "technicalScore": 0,
      "communicationScore": 0,
      "feedback": "string",
      "strengths": ["item"],
      "improvements": ["item"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text);
  } catch (err) {
    if (err.status === 429) {
      return {
        technicalScore: 85,
        communicationScore: 90,
        feedback:
          "Gemini quota exhausted. Fallback response generated.",
        strengths: [
          "Clear explanation",
          "Good technical terminology"
        ],
        improvements: [
          "Add real-world examples"
        ]
      };
    }
    throw err;
  }
}

async function transcribeAudio(audioBuffer) {
    try{
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: [
          {
            inlineData: {
              mimeType: "audio/webm",
              data: audioBuffer.toString("base64")
            }
          },
          {
            text: "Transcribe this interview answer exactly. Return only the transcript text."
          }
        ]
      });
      return response.text;
    } catch(err){
      console.error("Transcription error:", err);
      return "TRANSCRIPTION FAILED";
    }
}

async function onboardingCopilot(question) {  
  const prompt = `
    You are an HR onboarding assistant. Answer employee questions professionally.
    Question: ${question}
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt
  });

  return response.text;
}

async function predictTurnoverRisk(metricsSummary) {
  const prompt = `You are an HR analytics expert. Analyze: ${metricsSummary}
    Return JSON:{
      "turnoverRiskPercentage": 0,
      "primaryRiskFactor": "",
      "recommendation": ""
    }
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config:{
      responseMimeType:"application/json"
    }
  });

  return JSON.parse(response.text);
}

module.exports = {
  screenResume,
  evaluateInterview,
  onboardingCopilot,
  predictTurnoverRisk,
  transcribeAudio
};