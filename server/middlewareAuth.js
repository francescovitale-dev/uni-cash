// middlewareAuth.js

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Missing authorization token' });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = decoded;
    console.log('User authenticated:', req.user);
    next();
  });
};

module.exports = authenticateJWT;
