// const express = require('express');
// const router = express.Router();
// const { generateQuote, getQuoteOfTheDay, saveFavorite, getFavorites } = require('../controllers/quoteController');

// router.post('/generate', generateQuote);
// router.get('/quote-of-the-day', getQuoteOfTheDay);
// router.post('/favorite', saveFavorite);
// router.get('/favorites', getFavorites);

// module.exports = router;
const express = require('express');
const router = express.Router();
const {  generateQuote, 
  getQuoteOfTheDay, 
  getFavorites, 
  saveFavorite, 
  removeFavorite, 
  deleteAllFavorites  } = require('../controllers/quoteController');

router.post('/generate', generateQuote);
router.get('/quote-of-the-day', getQuoteOfTheDay);
router.post('/addfavorite', saveFavorite);
router.get('/getfavorites', getFavorites);
router.delete('/favorite/:favoriteId',removeFavorite);
router.delete('/deletefavrouitesquotes', deleteAllFavorites)


module.exports = router;
