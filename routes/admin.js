// routes/admin.js
const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Admin Dashboard
router.get('/', ensureAuthenticated, adminController.adminDashboard);

// Manage Posts
router.get('/posts', ensureAuthenticated, adminController.managePosts);
router.post('/posts/delete/:id', ensureAuthenticated, adminController.deletePost);

// Manage Comments
router.get('/comments', ensureAuthenticated, adminController.manageComments);
router.post('/comments/delete/:id', ensureAuthenticated, adminController.deleteComment);

module.exports = router;
