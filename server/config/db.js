// // const mongoose = require("mongoose");

// // const connectDB = async () => {
// //   try {
// //     // You can replace the MONGO_URI with your MongoDB connection string
// //     const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/yourDatabaseName";

// //     // Connect to MongoDB
// //     await mongoose.connect(mongoURI, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });

// //     console.log("MongoDB connected successfully");
// //   } catch (error) {
// //     console.error("Error connecting to MongoDB:", error);
// //     process.exit(1);  // Exit the application in case of a connection failure
// //   }
// // };

// // module.exports = connectDB;

// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/yourDatabaseName";
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/yourDatabaseName";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
