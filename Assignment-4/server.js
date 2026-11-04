require('dotenv').config();
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoute = require('./routes/profileRoute');
const initChat = require('./sockets/chat');
const registerListeners = require('./events/listeners');
const { notFound, errorHandler } = require('./middleware/errorHandler');

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing in .env');
  process.exit(1);
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public')); // tiny chat client at http://localhost:5000

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoute);
app.use('/api/notes', noteRoutes);
app.use('/api/admin', adminRoutes);
app.use(notFound);
app.use(errorHandler);

initChat(io);
registerListeners(io);

const PORT = process.env.PORT || 5000;
connectDB().then(() => server.listen(PORT, () => console.log(`[server] listening on http://localhost:${PORT}`)));
