const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // db.js ko sahi jagah shift karke import

// Routes
const userRoutes = require('./routes/userRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

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
