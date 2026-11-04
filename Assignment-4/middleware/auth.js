const { verifyToken, extractToken } = require('../utils/token');

// Rejects the request unless a valid JWT is supplied (header or cookie)
exports.authenticate = (req, res, next) => {
  const token = extractToken(req.headers);
  if (!token) return res.status(403).json({ message: 'No token provided' });
  try {
    req.user = verifyToken(token); // { id, username, role, iat, exp }
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
    res.status(401).json({ message });
  }
};

// Role-based access control: authorize('admin')
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: insufficient permissions' });
  }
  next();
};
