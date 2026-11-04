const Product = require('../models/Product');

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const SORTABLE = ['name', 'sku', 'category', 'price', 'quantity', 'createdAt', 'updatedAt'];

// POST /api/products
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// GET /api/products?category=&supplier=&search=&minPrice=&maxPrice=&inStock=&sort=-price,name&page=1&limit=10
exports.getProducts = async (req, res) => {
  const { category, supplier, search, minPrice, maxPrice, inStock } = req.query;
  const filter = {};

  if (category) filter.category = new RegExp(`^${escapeRegex(category)}$`, 'i');
  if (supplier) filter.supplier = new RegExp(escapeRegex(supplier), 'i');
  if (search) filter.name = new RegExp(escapeRegex(search), 'i');
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (inStock === 'true') filter.quantity = { $gt: 0 };
  if (inStock === 'false') filter.quantity = 0;

  const sort = {};
  (req.query.sort || '-createdAt').split(',').forEach((s) => {
    const desc = s.startsWith('-');
    const field = s.replace(/^-/, '').trim();
    if (SORTABLE.includes(field)) sort[field] = desc ? -1 : 1;
  });

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);

  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit)
  ]);

  res.json({ total, page, totalPages: Math.ceil(total / limit), count: products.length, products });
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

// PATCH /api/products/:id/stock  body: { "change": 10 } (positive = restock, negative = sale)
exports.adjustStock = async (req, res) => {
  const change = req.body.change;
  if (!Number.isInteger(change) || change === 0) {
    return res.status(400).json({ error: '"change" must be a non-zero integer' });
  }
  // Atomic: the condition and $inc happen in one operation, so quantity can never go negative
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, quantity: { $gte: -change } },
    { $inc: { quantity: change } },
    { new: true }
  );
  if (!product) {
    const exists = await Product.exists({ _id: req.params.id });
    if (!exists) return res.status(404).json({ error: 'Product not found' });
    return res.status(400).json({ error: 'Insufficient stock for this sale' });
  }
  res.json({ message: 'Stock updated', product });
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted', id: product.id });
};

// GET /api/products/low-stock
exports.getLowStock = async (req, res) => {
  const lowStockItems = await Product.find({ $expr: { $lte: ['$quantity', '$reorderLevel'] } }).sort({ quantity: 1 });
  res.json({ count: lowStockItems.length, lowStockItems });
};

// GET /api/products/summary
exports.getSummary = async (req, res) => {
  const summary = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        totalItems: { $sum: 1 },
        totalQuantity: { $sum: '$quantity' },
        totalStockValue: { $sum: { $multiply: ['$price', '$quantity'] } },
        avgPrice: { $avg: '$price' }
      }
    },
    { $project: { totalItems: 1, totalQuantity: 1, totalStockValue: 1, avgPrice: { $round: ['$avgPrice', 2] } } },
    { $sort: { totalStockValue: -1 } }
  ]);
  res.json({ categories: summary.length, summary });
};
