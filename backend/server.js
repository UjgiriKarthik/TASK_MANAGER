require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI);

// routes
app.use('/api', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// basic health route
app.get('/', (req, res) => res.send('Task Manager API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("JWT SECRET:", process.env.JWT_SECRET);
