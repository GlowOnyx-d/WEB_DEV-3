const router = require('express').Router();
const { authenticate } = require('../middleware/auth');

// Simple protected route: returns the identity stored in the JWT
router.get('/', authenticate, (req, res) => {
  const { id, username, role } = req.user;
  res.json({ id, username, role });
});

module.exports = router;
