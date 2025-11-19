require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

console.log("JWT SECRET:", process.env.JWT_SECRET);

const app = express();

// Allowed deployed frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "https://task-manager-neon-gamma.vercel.app"
];

// CORS FIX (Render compatible)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow mobile apps / curl / Postman (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Handle preflight
app.options("*", cors());

app.use(express.json());

// Connect MongoDB
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
