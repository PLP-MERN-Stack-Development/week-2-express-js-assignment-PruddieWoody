const express = require('express');
const router = express.Router();
const { products } = require('../storage/products');
const { validateProduct } = require('../middleware/validate');
const NotFoundError = require('../utils/NotFoundError');
const ValidationError = require('../utils/ValidationError');

// GET /api/products?category=xyz&page=1&pageSize=10
router.get('/', (req, res, next) => {
  try {
    let result = products;
    // Filtering
    if (req.query.category) {
      result = result.filter(p => p.category === req.query.category);
    }
    // Search
    if (req.query.search) {
      const search = req.query.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(search));
    }
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const start = (page - 1) * pageSize;
    const paginated = result.slice(start, start + pageSize);

    res.json({
      page,
      pageSize,
      total: result.length,
      products: paginated
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/statistics
router.get('/statistics', (req, res, next) => {
  try {
    const stats = {};
    products.forEach(p => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products
router.post('/', validateProduct, (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
      id: require('uuid').v4(),
      name,
      description,
      price,
      category,
      inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id
router.put('/:id', validateProduct, (req, res, next) => {
  try {
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx === -1) throw new NotFoundError('Product not found');
    products[idx] = { id: req.params.id, ...req.body };
    res.json(products[idx]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id
router.delete('/:id', (req, res, next) => {
  try {
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx === -1) throw new NotFoundError('Product not found');
    products.splice(idx, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
