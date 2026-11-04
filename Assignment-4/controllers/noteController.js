const Note = require('../models/Note');
const appEvents = require('../events/appEvents');

// Users only touch their own notes; admins can touch any note
const scope = (req) => (req.user.role === 'admin' ? {} : { owner: req.user.id });

// POST /api/notes
exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content, owner: req.user.id });
  appEvents.emit('note:created', note);
  res.status(201).json(note);
};

// GET /api/notes
exports.getNotes = async (req, res) => {
  res.json(await Note.find(scope(req)).sort({ createdAt: 1 }));
};

// GET /api/notes/:id
exports.getNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, ...scope(req) });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
};

// PUT /api/notes/:id
exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findOneAndUpdate({ _id: req.params.id, ...scope(req) }, { title, content }, { new: true, runValidators: true });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, ...scope(req) });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  appEvents.emit('note:deleted', note);
  res.json({ message: 'Note deleted', id: note._id });
};
