const router = require('express').Router();
const c = require('../controllers/productController');
const { asyncHandler: h, validateObjectId } = require('../middleware/errorHandler');

// Static routes MUST come before "/:id"
router.get('/low-stock', h(c.getLowStock));
router.get('/summary', h(c.getSummary));

router.route('/').get(h(c.getProducts)).post(h(c.createProduct));
router.patch('/:id/stock', validateObjectId, h(c.adjustStock));
router.route('/:id')
  .get(validateObjectId, h(c.getProductById))
  .put(validateObjectId, h(c.updateProduct))
  .delete(validateObjectId, h(c.deleteProduct));

module.exports = router;
