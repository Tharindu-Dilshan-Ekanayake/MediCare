const express = require('express');
const router = express.Router();
const cors = require('cors');

// Updated CORS configuration
// Allow all origins
router.use(
    cors({
        credentials: true, // Allow credentials like cookies, headers, etc.
        origin: '*', // Allow all origins
    })
);

// Importing controller functions
const { createUser, updateUser} = require('../controllers/usercontroller');
const { login,  getProfile, logoutUser } = require('../controllers/authcontroller');

// Defining routes
router.post('/createuser', createUser);
router.put('/updateuser/:id', updateUser);

//auth
router.post('/login', login)
router.get('/getprofile',  getProfile)
router.post('/logout', logoutUser);

module.exports = router;
