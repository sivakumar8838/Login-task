const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const loginRouter = require('express').Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const usere = await User.findOne({ username });

        if (!usere) {
            return res.status(401).json({ message: 'Invalid username ' });
        }

        const isMatch = await bcrypt.compare(password, usere.passwordHash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const payload = {
            username: usere.username,
            id: usere._id,
        };

        const token = jwt.sign(payload, config.JWT_SECRET);
        res.status(200).json({ token, username: usere.username });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = loginRouter;
