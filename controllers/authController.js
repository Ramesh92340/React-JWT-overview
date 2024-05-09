const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/userModel');
const config = require('../config/config');

const register = async (req, res) => {
    const {id, username, password, email } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await createUser(id,username, hashedPassword, email);

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ token, user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration failed.' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed.' });
    }
};

module.exports = {
    register,
    login,
};
