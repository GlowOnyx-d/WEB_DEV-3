const jwt = require('jsonwebtoken');

exports.signToken = (user) =>
  jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  });

exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

// Looks for "Authorization: Bearer <token>" first, then a "token=<jwt>" cookie
exports.extractToken = (headers = {}) => {
  const auth = headers.authorization;
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7).trim();
  const match = (headers.cookie || '').match(/(?:^|;\s*)token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};
