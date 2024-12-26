// Backend - userController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Function to get default base64 image
const getDefaultImage = () => {
    try {
        const imagePath = path.join(__dirname, '../assets/images/bg/nodp.jpg');
        const imageBuffer = fs.readFileSync(imagePath);
        return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    } catch (error) {
        console.error('Error reading default image:', error);
        return '';
    }
};

const createUser = async (req, res) => {
    try {
        const {fname, lname, email, phone_number, password, role, dob, image} = req.body;
        
        // Use provided image or default base64 image
        const userImage = image || getDefaultImage();
        
        const user = new User({
            fname,
            lname,
            email,
            phone_number,
            password,
            role,
            dob,
            image: userImage
        });

        const saveUser = await user.save();
        res.status(201).json({ message: 'User created successfully', data: saveUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {fname, lname, email, phone_number, password, role, dob, image} = req.body;
        
        // Use provided image or keep existing image
        const updateData = {
            fname,
            lname,
            email,
            phone_number,
            password,
            role,
            dob,
            image
        };

        if (image) {
            updateData.image = image;
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ message: 'User updated successfully', data: user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createUser,
    updateUser
};