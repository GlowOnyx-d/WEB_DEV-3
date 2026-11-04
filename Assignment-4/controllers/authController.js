const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signToken } = require('../utils/token');
const appEvents = require('../events/appEvents');

const SALT_ROUNDS = 10;

// POST /api/auth/signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'username, email and password are required' });
  }
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

  const role = process.env.ADMIN_EMAIL && email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() ? 'admin' : 'user';
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ username, email, password: hashed, role });

  appEvents.emit('user:registered', user);
  res.status(201).json({ message: 'User registered', id: user._id, username: user.username, email: user.email });
};

// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

  const user = await User.findOne({ email: email.toLowerCase() });
  const ok = user && (await bcrypt.compare(password, user.password));
  if (!ok) return res.status(401).json({ message: 'Invalid email or password' }); // same message for both cases

  const token = signToken(user);
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 1000 });
  appEvents.emit('user:loggedIn', user);
  res.json({ message: 'Login successful', token });
};

// POST /api/auth/logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
