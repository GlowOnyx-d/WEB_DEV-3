const router = require('express').Router();
const c = require('../controllers/noteController');
const { authenticate } = require('../middleware/auth');
const { asyncHandler: h, validateObjectId } = require('../middleware/errorHandler');

router.use(authenticate); // every notes route is protected

router.route('/').get(h(c.getNotes)).post(h(c.createNote));
router.route('/:id')
  .get(validateObjectId, h(c.getNote))
  .put(validateObjectId, h(c.updateNote))
  .delete(validateObjectId, h(c.deleteNote));

module.exports = router;
