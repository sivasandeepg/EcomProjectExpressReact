const express = require('express');
const router = express.Router();
const GoogleAuthController = require('../controllers/GoogleAuthController');
 
router.get('/login', GoogleAuthController.googleLogin);
router.get('/callback', GoogleAuthController.googleCallback);
router.get('/current_user', GoogleAuthController.currentUser);
router.get('/logout', GoogleAuthController.logout);

module.exports = router;
 