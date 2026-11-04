const router = require('express').Router();
const c = require('../controllers/authController');
const { asyncHandler: h } = require('../middleware/errorHandler');

router.post('/signup', h(c.signup));
router.post('/login', h(c.login));
router.post('/logout', c.logout);

module.exports = router;
