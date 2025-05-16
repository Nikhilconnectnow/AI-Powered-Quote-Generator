const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // db.js ko sahi jagah shift karke import
const helmet = require('helmet');
const compression = require('compression');

// Routes
const userRoutes = require('./routes/userRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());


// Routes
app.use('/api/user', userRoutes);
app.use('/api/quote', quoteRoutes);

// Connect to MongoDB & start server
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received — shutting down gracefully');
  process.exit(0);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});
