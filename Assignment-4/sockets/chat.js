const Message = require('../models/Message');
const { verifyToken, extractToken } = require('../utils/token');
const appEvents = require('../events/appEvents');

const cleanRoom = (r) => String(r || '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 30);

module.exports = function initChat(io) {
  // Handshake authentication: connect only with a valid JWT
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || extractToken(socket.handshake.headers);
    if (!token) return next(new Error('No token provided'));
    try {
      socket.user = verifyToken(token);
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const { id: userId, username } = socket.user;
    console.log(`User connected: ${socket.id}`);
    socket.join(`user:${userId}`); // personal room for notifications

    socket.on('joinRoom', async (roomName) => {
      const room = cleanRoom(roomName);
      if (!room) return socket.emit('errorMessage', 'Invalid room name');
      socket.join(room);
      console.log(`${socket.id} joined room ${room}`);

      const history = await Message.find({ room }).sort({ createdAt: -1 }).limit(20);
      socket.emit('history', history.reverse());
      socket.to(room).emit('systemMessage', { room, text: `${username} joined` });
    });

    socket.on('leaveRoom', (roomName) => {
      const room = cleanRoom(roomName);
      socket.leave(room);
      console.log(`${socket.id} left room ${room}`);
      socket.to(room).emit('systemMessage', { room, text: `${username} left` });
    });

    socket.on('chatMessage', async ({ room: roomName, text } = {}) => {
      const room = cleanRoom(roomName);
      const body = String(text || '').trim();
      if (!room || !body) return;
      if (!socket.rooms.has(room)) return socket.emit('errorMessage', 'Join the room first');

      const msg = await Message.create({ room, sender: userId, username, text: body });
      io.to(room).emit('chatMessage', { room, username, text: msg.text, createdAt: msg.createdAt });
      console.log(`[${room}] ${username}: ${msg.text}`);
      appEvents.emit('chat:message', msg);
    });

    socket.on('typing', (roomName) => socket.to(cleanRoom(roomName)).emit('typing', { username }));

    socket.on('disconnect', () => console.log(`User disconnected: ${socket.id}`));
  });
};
