import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('screening');
  const [loading, setLoading] = useState(false);

  // Feature 1 States: Resume Screening [cite: 80]
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('Looking for an AI/ML with Fullstack Engineer proficient in React, Node.js, and Gemini API[cite: 8, 12, 13, 15].');
  const [screeningResult, setScreeningResult] = useState(null);

  // Feature 2 States: Interview Evaluation [cite: 87]
  const [interviewQuestion] = useState('Explain the difference between a SQL and NoSQL database.');
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [interviewResult, setInterviewResult] = useState(null);

  // Feature 3 States: Onboarding Copilot
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [chatHistory]);

  // Feature 4 States: Predictive HR Analytics
  const [metricsSummary, setMetricsSummary] = useState('Team Alpha: 14% absenteeism spike this month. Average employee tenure is 1.2 years. Software department feedback indicates high burnout tools.');
  const [analyticsResult, setAnalyticsResult] = useState(null);

  // API Call: Feature 1 (Resume Screening) [cite: 80]
  const handleScreening = async () => {
  setLoading(true);

  try {
    let res;

    if (resumeFile && jdFile) {
      const formData = new FormData();

      formData.append("resume", resumeFile);
      formData.append("jd", jdFile);

      res = await fetch(
        "http://localhost:5000/api/ai/screen-resume-file",
        {
          method: "POST",
          body: formData
        }
      );
    } else {
      res = await fetch(
        "http://localhost:5000/api/ai/screen-resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            resumeText,
            jobDescription: jdText
          })
        }
      );
    }

    const data = await res.json();
    setScreeningResult(data.evaluation);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  // API Call: Feature 2 (Interview Evaluation) [cite: 87]
  const handleInterviewEval = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/evaluate-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: interviewQuestion, candidateAnswer })
      });
      const data = await res.json();
      setInterviewResult(data.evaluation);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // API Call: Feature 3 (Onboarding Chatbot)
  const handleOnboardingChat = async () => {

  if (!chatQuestion.trim()) return;

  const userMessage = chatQuestion;

  setChatQuestion('');
  setLoading(true);

  try {

    const res = await fetch(
      'http://localhost:5000/api/ai/onboarding-chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: userMessage
        })
      }
    );

    const data = await res.json();

    setChatHistory(prev => [
      ...prev,
      {
        type: 'user',
        text: userMessage,
        time: new Date().toLocaleTimeString()
      },
      {
        type: 'bot',
        text: data.answer,
        time: new Date().toLocaleTimeString()
      }
    ]);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  // API Call: Feature 4 (Predictive Analytics)
  const handlePredictiveAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/predict-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metricsSummary })
      });
      const data = await res.json();
      setAnalyticsResult(data.analytics);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div>
          <div className="sidebar-title">FWC HRMS PORTAL [cite: 4, 78]</div>
          <div className="sidebar-subtitle">AI-Powered Suite</div>
          
          <nav className="nav-menu">
            <button onClick={() => setActiveTab('screening')} className={`nav-button ${activeTab === 'screening' ? 'active' : ''}`}>
              📄 AI Resume Screening [cite: 80]
            </button>
            <button onClick={() => setActiveTab('interview')} className={`nav-button ${activeTab === 'interview' ? 'active' : ''}`}>
              🎙️ Smart Video Interview [cite: 87]
            </button>
            <button onClick={() => setActiveTab('copilot')} className={`nav-button ${activeTab === 'copilot' ? 'active' : ''}`}>
              💬 Onboarding Copilot
            </button>
            <button onClick={() => setActiveTab('analytics')} className={`nav-button ${activeTab === 'analytics' ? 'active' : ''}`}>
              📊 Predictive Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="main-content">
        <header className="content-header">
          <div>
            <h2 className="header-title">{activeTab.replace('-', ' ')} Hub</h2>
          </div>
          <span className="scale-badge">Scale Ready: 5000+ Users [cite: 92]</span>
        </header>

        {/* TAB 1: RESUME SCREENING */}
        {activeTab === 'screening' && (
  <div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}
    >
      <div>
        <label className="form-label">
          Upload Job Description
        </label>

        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={(e) =>
            setJdFile(e.target.files[0])
          }
          className="input-field"
        />

        {jdFile && (
          <p style={{ marginTop: '8px' }}>
            📄 {jdFile.name}
          </p>
        )}
      </div>

      <div>
        <label className="form-label">
          Upload Resume
        </label>

        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={(e) =>
            setResumeFile(e.target.files[0])
          }
          className="input-field"
        />

        {resumeFile && (
          <p style={{ marginTop: '8px' }}>
            📄 {resumeFile.name}
          </p>
        )}
      </div>
    </div>

    <div className="grid-layout">
      <div className="form-group">
        <label className="form-label">
          Job Description Text
        </label>

        <textarea
          value={jdText}
          onChange={(e) =>
            setJdText(e.target.value)
          }
          className="textarea-field"
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Resume Text
        </label>

        <textarea
          value={resumeText}
          onChange={(e) =>
            setResumeText(e.target.value)
          }
          placeholder="Paste candidate resume here..."
          className="textarea-field"
        />
      </div>
    </div>

    <button
      onClick={handleScreening}
      disabled={
        loading ||
        (
          !resumeFile &&
          !resumeText.trim()
        )
      }
      className="action-button"
    >
      {loading
        ? 'Evaluating via Gemini AI...'
        : 'Execute AI Resume Screening'}
    </button>

    {screeningResult && (
      <>
        <div className="result-card">
          <h3 className="result-title">
            🤖 AI Assessment Matrix
          </h3>

          <div className="score-display">
            {screeningResult.fitmentScore}/100
          </div>

          <div className="metrics-row">
            <div className="metric-box green">
              <span className="box-title">
                Matched Skills
              </span>

              <strong>
                {screeningResult.matchedSkills?.join(', ') ||
                  'None'}
              </strong>
            </div>

            <div className="metric-box amber">
              <span className="box-title">
                Missing Skills
              </span>

              <strong>
                {screeningResult.missingSkills?.join(', ') ||
                  'None'}
              </strong>
            </div>
          </div>

          <div className="metric-box slate">
            <span className="box-title">
              Summary
            </span>

            <p>
              {screeningResult.summary}
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: '15px',
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: 'bold',
            background:
              screeningResult.fitmentScore >= 80
                ? '#dcfce7'
                : screeningResult.fitmentScore >= 60
                ? '#fef3c7'
                : '#fee2e2'
          }}
        >
          {screeningResult.fitmentScore >= 80
            ? '🟢 SHORTLIST'
            : screeningResult.fitmentScore >= 60
            ? '🟡 REVIEW'
            : '🔴 REJECT'}
        </div>
      </>
    )}
  </div>
)}

        {/* TAB 2: INTERVIEW EVALUATION */}
        {activeTab === 'interview' && (
          <div>
            <div className="form-group">
              <label className="form-label">Simulated Technical Question</label>
              <input type="text" value={interviewQuestion} className="input-field" disabled style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Candidate Audio Transcript Reply</label>
              <textarea placeholder="Type or paste candidate audio-to-text response..." value={candidateAnswer} onChange={(e) => setCandidateAnswer(e.target.value)} className="textarea-field" style={{ height: '100px' }} />
            </div>
            <button onClick={handleInterviewEval} disabled={loading || !candidateAnswer} className="action-button">
              {loading ? 'Analyzing Transcript...' : 'Process Interview Evaluation'}
            </button>

            {interviewResult && (
              <div className="result-card">
                <h3 className="result-title">🎙️ Audio Interview Analysis[cite: 87]:</h3>
                <div className="metrics-row">
                  <div className="metric-box slate" style={{ textAlign: 'center' }}><span className="box-title">Technical Competence</span><strong style={{ fontSize: '24px', color: '#4f46e5' }}>{interviewResult.technicalScore}/100</strong></div>
                  <div className="metric-box slate" style={{ textAlign: 'center' }}><span className="box-title">Communication Fluency</span><strong style={{ fontSize: '24px', color: '#0891b2' }}>{interviewResult.communicationScore}/100</strong></div>
                </div>
                <div className="metric-box slate"><span className="box-title">Targeted Technical Feedback</span><p style={{ margin: '6px 0 0 0', lineHeight: '1.5' }}>{interviewResult.feedback}</p></div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ONBOARDING COPILOT */}
        {activeTab === 'copilot' && (
          <div className="chat-window">
            <div>
              <div className="chat-bubble-incoming">👋 Hello! I am your FWC Onboarding Assistant. You can ask me anything regarding company casual leave bounds, structural checklists, or corporate documentation.</div>
              <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '20px'
  }}
>

  {chatHistory.map((msg, index) => (

    <div
      key={index}
      style={{
        alignSelf:
          msg.type === 'user'
            ? 'flex-end'
            : 'flex-start',

        background:
          msg.type === 'user'
            ? '#2563eb'
            : '#f1f5f9',

        color:
          msg.type === 'user'
            ? 'white'
            : '#111827',

        padding: '12px',
        borderRadius: '12px',
        maxWidth: '75%'
      }}
    >
      <div
        style={{
          fontSize: '12px',
          opacity: 0.7,
          marginBottom: '4px'
        }}
      >
        {msg.type === 'user'
          ? 'You'
          : 'FWC Assistant'}
      </div>

      <div>
        {msg.text}
      </div>

      <div
        style={{
          fontSize: '10px',
          marginTop: '6px',
          opacity: 0.6
        }}
      >
        {msg.time}
      </div>

    </div>

  ))}
  <div ref={chatEndRef}></div>

</div>
            </div>
            
            <div className="chat-input-row">
              <input type="text" placeholder="Ask a question (e.g., Generate a clean onboarding documentation checklist...)" value={chatQuestion} onChange={(e) => setChatQuestion(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleOnboardingChat()} className="input-field" />
              <button onClick={handleOnboardingChat} disabled={loading || !chatQuestion} className="action-button" style={{ backgroundColor: '#0f172a' }}>
                {loading ? 'Replying...' : 'Send'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PREDICTIVE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div>
            <div className="form-group">
              <label className="form-label">Aggregated Department Metrics Log</label>
              <textarea value={metricsSummary} onChange={(e) => setMetricsSummary(e.target.value)} className="textarea-field" style={{ height: '90px' }} />
            </div>
            <button onClick={handlePredictiveAnalytics} disabled={loading || !metricsSummary} className="action-button">
              {loading ? 'Running Risk Computations...' : 'Calculate Retention Risk Metrics'}
            </button>

            {analyticsResult && (
              <div className="result-card">
                <h3 className="result-title">📈 Predictive Team Attrition Modeling:</h3>
                <div className="metric-box rose" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
                  <strong style={{ fontSize: '32px' }}>{analyticsResult.turnoverRiskPercentage}%</strong>
                  <div>
                    <span className="box-title">Calculated Attrition Risk</span>
                    <span style={{ fontSize: '13px' }}>Primary Aggressor: {analyticsResult.primaryRiskFactor}</span>
                  </div>
                </div>
                <div className="metric-box slate"><span className="box-title">AI Mitigation Strategy Recommendation</span><p style={{ margin: '6px 0 0 0', fontWeight: '500' }}>{analyticsResult.recommendation}</p></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;