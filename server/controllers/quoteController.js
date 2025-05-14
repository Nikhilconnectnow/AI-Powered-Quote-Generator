// const User = require("../models/user");
// const { GoogleGenAI } = require("@google/genai");
// require('dotenv').config();

// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

// // Generate Quotes (topic, total, category)
// const generateQuote = async (req, res) => {
//   try {
//     const { topic, total, category, userId } = req.body;
//     if (!topic || !total || !category || !userId) {
//       return res.status(400).json({ message: "Please provide topic, total, category and userId" });
//     }

//     const prompt = `Generate ${total} inspirational quotes that are about "${topic}" and fall under the category "${category}". Return ONLY a JSON array like ["quote1", "quote2"] with no other text.`;

//     const result = await ai.generativeModel({
//       model: "gemini-1.5-flash",
//     }).generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';

//     let quotes = [];
//     try {
//       quotes = JSON.parse(responseText);
//       if (!Array.isArray(quotes)) throw new Error("Not an array");
//     } catch {
//       quotes = responseText.split('\n').filter(q => q.trim() !== '');
//     }

//     await User.findByIdAndUpdate(userId, { $push: { quotes: { $each: quotes } } });
//     res.status(200).json({ quotes, category });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error generating quotes' });
//   }
// };

// // Quote of the Day
// const getQuoteOfTheDay = async (req, res) => {
//   try {
//     const prompt = `Give 1 inspirational quote of the day. Return ONLY a JSON array like ["quote"] with no other text.`;

//     const result = await ai.generativeModel({
//       model: "gemini-1.5-flash",
//     }).generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';

//     let quoteOfTheDay = "";
//     try {
//       const quotes = JSON.parse(responseText);
//       quoteOfTheDay = quotes[0] || "Stay positive!";
//     } catch {
//       quoteOfTheDay = responseText.split('\n').filter(q => q.trim() !== '')[0] || "Stay positive!";
//     }

//     res.status(200).json({ quoteOfTheDay });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error generating quote of the day" });
//   }
// };

// // Save Favorite
// const saveFavorite = async (req, res) => {
//   try {
//     const { quote, category, userId } = req.body;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.favorites.push({ quote, category });
//     await user.save();

//     return res.status(200).json({ message: "Favorite saved successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Error saving favorite" });
//   }
// };

// // Get Favorites
// const getFavorites = async (req, res) => {
//   try {
//     const { userId } = req.query;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     return res.status(200).json({ favorites: user.favorites });
//   } catch (error) {
//     return res.status(500).json({ message: "Error getting favorites" });
//   }
// };

// module.exports = { generateQuote, getQuoteOfTheDay, saveFavorite, getFavorites };

// const User = require("../models/user");
// const { GoogleGenAI } = require("@google/genai");
// require('dotenv').config();

// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

// // Generate Quotes
// const generateQuote = async (req, res) => {
//   try {
//     const { topic, total, category, userId } = req.body;
//     if (!topic || !total || !category || !userId) {
//       return res.status(400).json({ message: "Please provide topic, total, category and userId" });
//     }

//     const prompt = `Generate ${total} inspirational quotes that are about "${topic}" and fall under the category "${category}". Return ONLY a JSON array like ["quote1", "quote2"] with no other text.`;

//     const result = await ai.generativeModel({ model: "gemini-1.5-flash" }).generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';

//     let quotes = [];
//     try {
//       quotes = JSON.parse(responseText);
//       if (!Array.isArray(quotes)) throw new Error("Not an array");
//     } catch {
//       quotes = responseText.split('\n').filter(q => q.trim() !== '');
//     }

//     await User.findByIdAndUpdate(userId, { $push: { quotes: { $each: quotes } } });
//     res.status(200).json({ quotes, category });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error generating quotes' });
//   }
// };

// // Quote of the Day
// const getQuoteOfTheDay = async (req, res) => {
//   try {
//     const prompt = `Give 1 inspirational quote of the day. Return ONLY a JSON array like ["quote"] with no other text.`;

//     const result = await ai.generativeModel({ model: "gemini-1.5-flash" }).generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';

//     let quoteOfTheDay = "";
//     try {
//       const quotes = JSON.parse(responseText);
//       quoteOfTheDay = quotes[0] || "Stay positive!";
//     } catch {
//       quoteOfTheDay = responseText.split('\n').filter(q => q.trim() !== '')[0] || "Stay positive!";
//     }

//     res.status(200).json({ quoteOfTheDay });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error generating quote of the day" });
//   }
// };

// // Save Favorite
// const saveFavorite = async (req, res) => {
//   try {
//     const { quote, category, userId } = req.body;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.favorites.push({ quote, category });
//     await user.save();

//     res.status(200).json({ message: "Favorite saved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error saving favorite" });
//   }
// };

// // Get Favorites
// const getFavorites = async (req, res) => {
//   try {
//     const { userId } = req.query;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ favorites: user.favorites });
//   } catch (error) {
//     res.status(500).json({ message: "Error getting favorites" });
//   }
// };

// module.exports = { generateQuote, getQuoteOfTheDay, saveFavorite, getFavorites };
// const User = require("../models/user");
// const { GoogleGenerativeAI } = require("@google/generative-ai");  // ✅ Correct import
// require('dotenv').config();

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

// // Generate Quotes
// const generateQuote = async (req, res) => {
//   try {
//     const { topic, total, category, userId } = req.body;
//     if (!topic || !total || !category || !userId) {
//       return res.status(400).json({ message: "Please provide topic, total, category and userId" });
//     }

//     const prompt = `Generate ${total} inspirational quotes that are about "${topic}" and fall under the category "${category}". Return ONLY a JSON array like ["quote1", "quote2"] with no other text.`;

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // ✅ Correct method
//     const result = await model.generateContent(prompt);

//     const responseText = result.response.text();  // ✅ Correct way to get text

//     let quotes = [];
//     try {
//       quotes = JSON.parse(responseText);
//       if (!Array.isArray(quotes)) throw new Error("Not an array");
//     } catch {
//       quotes = responseText.split('\n').filter(q => q.trim() !== '');
//     }

//     await User.findByIdAndUpdate(userId, { $push: { quotes: { $each: quotes } } });
//     res.status(200).json({ quotes, category });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error generating quotes' });
//   }
// };

// // Quote of the Day
// // const getQuoteOfTheDay = async (req, res) => {
// //   try {
// //     const prompt = `Give 1 inspirational quote of the day. Return ONLY a JSON array like ["quote"] with no other text.`;

// //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // ✅ Same method
// //     const result = await model.generateContent(prompt);

// //     const responseText = result.response.text();

// //     let quoteOfTheDay = "";
// //     try {
// //       const quotes = JSON.parse(responseText);
// //       quoteOfTheDay = quotes[0] || "Stay positive!";
// //     } catch {
// //       quoteOfTheDay = responseText.split('\n').filter(q => q.trim() !== '')[0] || "Stay positive!";
// //     }

// //     res.status(200).json({ quoteOfTheDay });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Error generating quote of the day" });
// //   }
// // };

// const getQuoteOfTheDay = async (req, res) => {
//   try {
//     const prompt = `Give 1 inspirational quote of the day. Return ONLY a JSON array like ["quote"] with no other text.`;

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // ✅ Same method
//     const result = await model.generateContent(prompt);

//     let responseText = result.response.text();

//     // Remove any unwanted characters or formatting (e.g., backticks, extra newlines)
//     responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
//     let quoteOfTheDay = "";
//     try {
//       // Try parsing the cleaned-up response as JSON
//       const quotes = JSON.parse(responseText);
//       quoteOfTheDay = quotes[0] || "Stay positive!";
//     } catch (error) {
//       // If JSON parsing fails, handle it as plain text
//       const quotes = responseText.split('\n').filter(q => q.trim() !== '');
//       quoteOfTheDay = quotes[0] || "Stay positive!";
//     }

//     res.status(200).json({ quoteOfTheDay });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error generating quote of the day" });
//   }
// }


// // Save Favorite
// const saveFavorite = async (req, res) => {
//   try {
//     const { quote, category, userId } = req.body;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.favorites.push({ quote, category });
//     await user.save();

//     res.status(200).json({ message: "Favorite saved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error saving favorite" });
//   }
// };

// const deleteFavouritesQuote = async (req, res) => {
//   try {
//     const { userId, quote } = req.body;
//     if (!userId || !quote) {
//       return res.status(400).json({ message: "Please provide userId and quote to delete" });
//     }

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const originalLength = user.favorites.length;
//     user.favorites = user.favorites.filter(fav => fav.quote !== quote);

//     if (user.favorites.length === originalLength) {
//       return res.status(404).json({ message: "Quote not found in favorites" });
//     }

//     await user.save();
//     res.status(200).json({ message: "Favorite quote deleted successfully", favorites: user.favorites });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error deleting favorite quote" });
//   }
// };


// // Get Favorites
// const getFavorites = async (req, res) => {
//   try {
//     const { userId } = req.query;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ favorites: user.favorites });
//   } catch (error) {
//     res.status(500).json({ message: "Error getting favorites" });
//   }
// };

// module.exports = { generateQuote, getQuoteOfTheDay, saveFavorite, getFavorites, deleteFavouritesQuote };



const User = require("../models/user");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

// Generate Quotes
// const generateQuote = async (req, res) => {
//   try {
//     const { topic, total, category, userId } = req.body;
//     if (!topic || !total || !userId) {
//       return res.status(400).json({ message: "Please provide topic, total, and userId" });
//     }

//     // Make category parameter optional
//     const categoryParam = category || "general";

//     const prompt = `Generate ${total} inspirational quotes that are about "${topic}"${category ? ` and fall under the category "${categoryParam}"` : ''}. Return ONLY a JSON array like ["quote1", "quote2"] with no other text.`;

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);

//     const responseText = result.response.text();

//     // Clean up and parse the response text
//     const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
//     let quotes = [];
//     try {
//       // Try to parse as JSON
//       const parsedData = JSON.parse(cleanedText);
//       if (Array.isArray(parsedData)) {
//         quotes = parsedData;
//       } else {
//         quotes = [cleanedText];
//       }
//     } catch (error) {
//       // If parsing fails, split by newlines
//       quotes = cleanedText.split('\n').filter(q => q.trim() !== '');
      
//       // Try to clean up further (remove "[", "]", etc.)
//       quotes = quotes.filter(q => q !== '[' && q !== ']')
//         .map(q => q.replace(/^"/, '').replace(/",?$/, '').replace(/\\"/g, '"').trim())
//         .filter(q => q);
//     }

//     // Update user's quotes array if successful
//     if (quotes.length > 0) {
//       await User.findByIdAndUpdate(userId, { 
//         $push: { quotes: { $each: quotes.map(q => ({ text: q, category: categoryParam })) } }
//       });
//     }

//     res.status(200).json({ quotes, category: categoryParam });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error generating quotes' });
//   }
// };


// // Generate Quotes
const generateQuote = async (req, res) => {
  try {
    const { topic, total, category, userId } = req.body;
    if (!topic || !total || !category || !userId) {
      return res.status(400).json({ message: "Please provide topic, total, category and userId" });
    }

    const prompt = `Generate ${total} inspirational quotes that are about "${topic}" and fall under the category "${category}". Return ONLY a JSON array like ["quote1", "quote2"] with no other text.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // ✅ Correct method
    const result = await model.generateContent(prompt);

    const responseText = result.response.text();  // ✅ Correct way to get text

    let quotes = [];
    try {
      quotes = JSON.parse(responseText);
      if (!Array.isArray(quotes)) throw new Error("Not an array");
    } catch {
      quotes = responseText.split('\n').filter(q => q.trim() !== '');
    }

    await User.findByIdAndUpdate(userId, { $push: { quotes: { $each: quotes } } });
    res.status(200).json({ quotes, category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating quotes' });
  }
};

// Quote of the Day
const getQuoteOfTheDay = async (req, res) => {
  try {
    const prompt = `Give 1 inspirational quote of the day. Return ONLY a JSON array like ["quote"] with no other text.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    let responseText = result.response.text();

    // Clean up the response text
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let quoteOfTheDay = "";
    try {
      // Try parsing the cleaned-up response as JSON
      const quotes = JSON.parse(responseText);
      quoteOfTheDay = Array.isArray(quotes) && quotes.length > 0 ? quotes[0] : "Stay positive!";
    } catch (error) {
      // If JSON parsing fails, handle it as plain text
      const quotes = responseText.split('\n').filter(q => q.trim() !== '');
      quoteOfTheDay = quotes.length > 0 ? quotes[0] : "Stay positive!";
    }

    res.status(200).json({ quoteOfTheDay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating quote of the day" });
  }
};

// Get User's Favorites
const getFavorites = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ favorites: user.favorites || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting favorites" });
  }
};

// Add to Favorites
const saveFavorite = async (req, res) => {
  try {
    const { userId, quote, category } = req.body;
    if (!userId || !quote) {
      return res.status(400).json({ message: "userId and quote are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if quote already exists in favorites
    const alreadyExists = user.favorites.some(fav => fav.quote === quote);
    if (alreadyExists) {
      return res.status(400).json({ message: "Quote already in favorites" });
    }

    // Add to favorites
    user.favorites.push({ quote, category });
    await user.save();

    res.status(200).json({ message: "Quote added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving favorite" });
  }
};

// Remove from Favorites
// const removeFavorite = async (req, res) => {
//   try {
//     const { favId } = req.params;
//     const { userId } = req.body;
    
//     if (!userId || !favId) {
//       return res.status(400).json({ message: "userId and favId are required" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Filter out the favorite to remove
//     user.favorites = user.favorites.filter(fav => fav._id.toString() !== favId);
//     await user.save();

//     res.status(200).json({ 
//       message: "Favorite quote removed successfully", 
//       favorites: user.favorites 
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error removing favorite" });
//   }
// };

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;
    const { userId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const initialLength = user.favorites.length;
    user.favorites = user.favorites.filter(fav => fav._id.toString() !== favoriteId);

    if (user.favorites.length === initialLength) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await user.save();
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing favorite" });
  }
};


// Delete all favorites for a user
const deleteAllFavorites = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear favorites array
    user.favorites = [];
    await user.save();

    res.status(200).json({ message: "All favorites deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting favorites" });
  }
};

module.exports = { 
  generateQuote, 
  getQuoteOfTheDay, 
  getFavorites, 
  saveFavorite, 
  removeFavorite, 
  deleteAllFavorites 
};