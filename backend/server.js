require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

console.log("JWT SECRET:", process.env.JWT_SECRET);

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://task-manager-neon-gamma.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// middleware
app.use(express.json());

// Connect DB
connectDB(process.env.MONGO_URI);

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Base route
app.get('/', (req, res) => {
  res.send('Task Manager API Running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
