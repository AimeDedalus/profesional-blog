const { Comment, Post, User } = require('../models');

exports.createComment = async (req, res) => {
    const { content, postId } = req.body;
    try {
        const comment = await Comment.create({
            content,
            UserId: req.user.id,
            PostId: postId
        });
        res.redirect(`/posts/${postId}`);
    } catch (error) {
        res.redirect(`/posts/${postId}`);
    }
};

exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByPk(id);
        if (comment.UserId !== req.user.id) {
            return res.redirect('back');
        }
        await comment.destroy();
        res.redirect('back');
    } catch (error) {
        res.redirect('back');
    }
};

