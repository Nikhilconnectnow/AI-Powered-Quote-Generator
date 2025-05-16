// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const transporter = require("../utils/mailer");

// require('dotenv').config();

// const JWT_SECRET = process.env.JWT_SECRET;

// // Register
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     return res.status(201).json({ message: "User registered successfully", userId: newUser._id });
//   } catch (error) {
//     return res.status(500).json({ message: "Error registering user" });
//   }
// };

// // Login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET);
//     return res.status(200).json({ token, userId: user._id });
//   } catch (error) {
//     return res.status(500).json({ message: "Error logging in user" });
//   }
// };

// // Forgot Password
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (!existingUser) return res.status(404).json({ message: "User not found" });

//     const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: "15m" });
//     const url = `http://localhost:5173/reset-password?token=${token}`;

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Reset Password",
//       html: `<p>Click on the following link to reset your password: <a href="${url}">${url}</a></p>`,
//     };
//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Error resetting password" });
//   }
// };

// // Reset Password
// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });
//     return res.status(200).json({ message: "Password reset successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/mailer");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.query.userId || req.params.userId;
    if (!userId) return res.status(400).json({ message: "UserId is required" });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user details" });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });
    // const url = `http://localhost:5173/reset-password?token=${token}`;
    const url =`${process.env.CLIENT_URL}/reset-password?token=${token}`;



    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      html: `<p>Click on the following link to reset your password: <a href="${url}">${url}</a></p>`,
    });

    res.status(200).json({ message: "Reset password email sent" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Error sending reset password email" });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  // try {
  //   const { token } = req.params;
  //   const { password } = req.body;
  //   const decoded = jwt.verify(token, JWT_SECRET);

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

  //   res.status(200).json({ message: "Password reset successfully" });
  // } catch (error) {
  //   res.status(500).json({ message: "Invalid or expired token" });
  // }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    const { password } = req.body;

    const decoded = jwt.verify(token, JWT_SECRET);

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token"); // Clear JWT from cookie (if used)

    // Redirect to home page (works if frontend and backend on same domain)
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};



module.exports = { registerUser, loginUser, forgotPassword, resetPassword,getUserDetails,logoutUser ,deleteUser};
