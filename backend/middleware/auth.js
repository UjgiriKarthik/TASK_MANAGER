const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token' });
    }
    const token = header.split(' ')[1];
    console.log("Auth Header:", req.headers.authorization);
    console.log("Token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);


  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user id and role
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
