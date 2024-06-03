// controllers/adminController.js
const { Post, Comment } = require('../models');

// Admin dashboard
exports.adminDashboard = (req, res) => {
    res.render('adminDashboard');
};

// Manage posts
exports.managePosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.render('managePosts', { posts });
    } catch (error) {
        res.redirect('/');
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/posts');
    } catch (error) {
        res.redirect('/admin/posts');
    }
};

// Manage comments
exports.manageComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.render('manageComments', { comments });
    } catch (error) {
        res.redirect('/');
    }
};

exports.deleteComment = async (req, res) => {
    try {
        await Comment.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/comments');
    } catch (error) {
        res.redirect('/admin/comments');
    }
};
