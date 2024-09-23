const express = require('express');
const router = express.Router();
const UserAuth = require('../controllers/UserAuthController');   
const auth = require('../middleware/auth'); 


// Register
router.post('/register', UserAuth.register);
 
// Login
router.post('/login', UserAuth.login);

// Get User
router.get('/getuser', auth, UserAuth.getuser); 

 // delete User 
router.delete('/deleteuser/:id',auth,  UserAuth.deleteuser);      

   
 // Logout User 
 router.post('/logout', auth, UserAuth.deleteuser);    

module.exports = router;
 