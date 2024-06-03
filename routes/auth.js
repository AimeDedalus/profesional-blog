const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Register
router.get('/register', authController.registerForm);
router.post('/register', authController.register);

// Login
router.get('/login', authController.loginForm);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true // Enable failure flash messages
}));

// Logout
router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
