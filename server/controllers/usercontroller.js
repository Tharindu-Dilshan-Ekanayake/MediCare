const User = require('../models/user');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    try {
        const {fname, lname, email, phone_number, password, role, dob ,image} = req.body;
        const user = new User({
            fname,
            lname,
            email,
            phone_number,
            password,
            role,
            dob,
            image
        });

        const saveUser = await user.save();
        res.status(201).json({ message: 'User created successfully', data: saveUser });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

//update user by id
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {fname, lname, email, phone_number, password, role, dob ,image} = req.body;
        const user = await User.findByIdAndUpdate(id, {
            fname,
            lname,
            email,
            phone_number,
            password,
            role,
            dob,
            image
        }, { new: true });

        res.status(200).json({ message: 'User updated successfully', data: user });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    createUser,
    updateUser
    

}
