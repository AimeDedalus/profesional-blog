// routes/tag.js
const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const tagController = require('../controllers/tagController');
const router = express.Router();

// Add Tag
router.post('/add', ensureAuthenticated, tagController.addTag);

// Edit Tag
router.get('/edit/:id', ensureAuthenticated, tagController.editTagForm);
router.post('/edit/:id', ensureAuthenticated, tagController.updateTag);

// Delete Tag
router.post('/delete/:id', ensureAuthenticated, tagController.deleteTag);

module.exports = router;
