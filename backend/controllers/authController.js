require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { UserRequestDTO, UserResponseDTO } = require('../dtos/userDTO');

module.exports = {
    registerUser: async (req, res) => {
        try {

            // checking for existing users
            const existingUser = await User.findOne({email: req.body.email});
            if(existingUser){
                return res.status(400).json({ message: 'User already exists'});
            }

            // creating new user
            const user = new User(new UserRequestDTO(req.body));
            await user.save();
            res.json({ message: 'User registered successfully'});

        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    },
    loginUser: async (req, res) => {
        try {
            // checking if user exists
            const user = await User.findOne({email: req.body.email});
            if(!user){
                return res.status(400).json({ message: 'User does not exist'});
            }

            // comparing passwords
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).json({ message: 'Invalid password'});
            }
            // generating token
            const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            res.cookie('token', token,  {
                httpOnly: true,
                secure: true, 
                sameSite: 'None', 
            }).status(200).json({ message: 'Logged in successfully', user: new UserResponseDTO(user)});
        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    },
    logoutUser: async (req, res) => {
        try {
            res.clearCookie('token').status(200).json({ message: 'Logged out successfully'});
        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }
}