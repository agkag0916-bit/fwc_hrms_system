const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 

// HIGH-SPEED IN-MEMORY DATABASE STRUCTURE 
// Optimized to handle simulated scaling requirements natively in server RAM 
global.db = { 
  users: [ 
    { 
      id: 1, 
      username: "admin", 
      role: "Management Admin" 
    }, 
    { 
      id: 2, 
      username: "manager", 
      role: "Senior Manager" 
    }, 
    { 
      id: 3, 
      username: "recruiter", 
      role: "HR Recruiter" 
    }, 
    { 
      id: 4, 
      username: "employee", 
      role: "Employee" 
    } ], 
    screenings: [], 
    interviews: [] 
  }; 

  console.log("LOADING AI ROUTES FROM:", require.resolve('./routes/aiRoutes'));
  
// Route Registration Links 
const aiRoutes = require('./routes/aiRoutes'); 
console.log(aiRoutes);
app.use('/api/ai', aiRoutes); 

// Simple Health Check Endpoint 
app.get('/', (req, res) => {
  res.json({ 
      status: "online", 
      architecture: "In-Memory Scaled Mode", 
      activeRecords: global.db.users.length 
  }); 
}); 

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { 
  console.log("FWC HRMS BACKEND SYSTEM STARTED SUCCESSFULLY"); 
  console.log(`Server listening dynamically on port: ${PORT}`); 
});