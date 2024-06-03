const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const commentController = require('../controllers/commentController');
const router = express.Router();

// Create Comment
router.post('/create', ensureAuthenticated, commentController.createComment);

// Delete Comment
router.post('/delete/:id', ensureAuthenticated, commentController.deleteComment);

module.exports = router;
