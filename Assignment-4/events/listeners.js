const appEvents = require('./appEvents');

module.exports = function registerListeners(io) {
  appEvents.on('user:registered', (user) => {
    console.log(`[event] user:registered -> ${user.username} (${user.role})`);
  });

  appEvents.on('user:loggedIn', (user) => {
    console.log(`[event] user:loggedIn -> ${user.username} at ${new Date().toISOString()}`);
  });

  // Push a real-time notification to every open socket of the note's owner
  appEvents.on('note:created', (note) => {
    console.log(`[event] note:created -> "${note.title}"`);
    io.to(`user:${note.owner}`).emit('notification', { type: 'note:created', message: `Note "${note.title}" created`, noteId: note._id });
  });

  appEvents.on('note:deleted', (note) => {
    console.log(`[event] note:deleted -> "${note.title}"`);
    io.to(`user:${note.owner}`).emit('notification', { type: 'note:deleted', message: `Note "${note.title}" deleted`, noteId: note._id });
  });
};
