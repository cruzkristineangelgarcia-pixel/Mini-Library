const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization') || req.header('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user object (without password)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    console.error('JWT error', err.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
