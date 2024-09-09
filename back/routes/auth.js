const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path as needed
const router = express.Router();

// Password regex to validate password strength
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}$/;

// Register User
router.post('/signup', async (req, res) => {
    const {
        name,
        email,
        password,
        phoneNumber,
        newsSubscription,
        userType,
        personalNumber,
        livingAddress,
        organizationName,
        identificationCode,
        actualAddress,
        contactPerson
    } = req.body;

    // Validate password
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ msg: 'Password does not meet the required criteria.' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            name,
            email,
            phoneNumber,
            password: await bcrypt.hash(password, 10),
            newsSubscription,
            userType,
            ...(userType === 'Person' && { personalNumber, livingAddress }),
            ...(userType === 'Legal Entity' && { organizationName, identificationCode, actualAddress, contactPerson })
        });

        await user.save();

        // Generate token
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        console.error('Signup error:', err); // Log error for debugging
        res.status(500).json({ msg: 'Server error' });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Login error:', err); // Log error for debugging
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
