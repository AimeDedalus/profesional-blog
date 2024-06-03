// routes/post.js
const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const postController = require('../controllers/postController');
const router = express.Router();

// Create Post
router.get('/new', ensureAuthenticated, postController.newPostForm);
router.post('/create', ensureAuthenticated, postController.createPost);

// Read Posts
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);  // Fetch a single post by ID

// Update Post
router.get('/edit/:id', ensureAuthenticated, postController.editPostForm);
router.post('/update/:id', ensureAuthenticated, postController.updatePost);

// Delete Post
router.post('/delete/:id', ensureAuthenticated, postController.deletePost);

module.exports = router;
