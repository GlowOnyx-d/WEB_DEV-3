const User = require('../models/User');

// GET /api/admin/users  (admin only)
exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: 1 });
  res.json({ count: users.length, users });
};
