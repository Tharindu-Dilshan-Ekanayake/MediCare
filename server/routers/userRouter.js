const express = require('express');
const router = express.Router();
const cors = require('cors');

// Updated CORS configuration
router.use(
    cors({
        credentials: true,
        origin: (origin, callback) => {
            const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    })
);

// Importing controller functions
const { createUser, updateUser } = require('../controllers/usercontroller');

// Defining routes
router.post('/createuser', createUser);
router.put('/updateuser/:id', updateUser);

module.exports = router;
