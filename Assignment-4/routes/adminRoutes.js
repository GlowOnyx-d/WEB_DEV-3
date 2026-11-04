const router = require('express').Router();
const { listUsers } = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');
const { asyncHandler: h } = require('../middleware/errorHandler');

router.get('/users', authenticate, authorize('admin'), h(listUsers));

module.exports = router;
