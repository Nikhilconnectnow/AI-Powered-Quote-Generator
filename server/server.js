// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// // Routes
// const userRoutes = require('./routes/userRoutes');
// const quoteRoutes = require('./routes/quoteRoutes');

// // Create Express app
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || '*',  // You can restrict the origins here
// }));

// // Routes
// app.use('/api/user', userRoutes);
// app.use('/api/quote', quoteRoutes);

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');

//     // Start the server after DB connection
//     app.listen(5000, () => {
//       console.log('Server is running on port 5000');
//     });
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);  // Exit the application in case of DB connection failure
//   }
// };

// // Initiate MongoDB connection
// connectDB();

// // Graceful Shutdown (important for production)
// process.on('SIGINT', () => {
//   mongoose.connection.close(() => {
//     console.log('MongoDB connection closed due to app termination');
//     process.exit(0);
//   });
// });

// // Error Handling Middleware (catch-all)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

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
