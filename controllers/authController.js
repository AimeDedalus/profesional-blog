// controllers/authController.js
const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.registerForm = (req, res) => {
    res.render('register', { error: req.flash('error') });
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hash });
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', 'Registration failed. Try again.');
        res.redirect('/auth/register');
    }
};

exports.loginForm = (req, res) => {
    res.render('login', { error: req.flash('error') });
};

exports.logoutUser = (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/auth/login');
    });
};