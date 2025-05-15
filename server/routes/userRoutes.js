// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/userController');

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:token', resetPassword);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword ,getUserDetails ,deleteUser ,logoutUser} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:token', resetPassword);
router.post('/reset-password', resetPassword);


router.delete('/deleteuser', deleteUser); 
router.get('/getuserdetails',getUserDetails)         
router.post('/logout', logoutUser);  

module.exports = router;
