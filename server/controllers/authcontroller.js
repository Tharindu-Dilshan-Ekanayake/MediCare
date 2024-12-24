const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../helper/auth');

// login end point
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (match) {
            // Create JWT token
            jwt.sign({ 
                id: user._id,
                fname: user.fname,
                lname: user.lname,
                role: user.role,
            }, process.env.REACT_APP_JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.json({
                    token: token,  // Send the token in the response body
                    user: {
                        _id: user._id,
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email,
                        role: user.role,
                    }
                });
            });
        } else {
            return res.json({ error: 'Incorrect password' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// get profile endpoint
const getProfile = async (req, res) => {
    const { token } = req.body;  // Get token from the request body

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.REACT_APP_JWT_SECRET, {}, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Find user by id
        User.findById(decoded.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                // Build user profile response
                const userProfile = {
                    email: user.email,
                    _id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    role: user.role,
                    phone_number: user.phone_number,
                    dob: user.dob,
                    image: user.image
                };

                res.json(userProfile);
            })
            .catch(error => {
                console.error('Error finding user:', error);
                res.status(500).json({ error: 'Server error' });
            });
    });
}

module.exports = {
    login,
    getProfile
}
