const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(logger);
app.use(bodyParser.json());

// Auth middleware for API routes
app.use('/api', auth);

// Routes
app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/products', productRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
