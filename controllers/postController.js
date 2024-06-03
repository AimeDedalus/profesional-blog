const { Post, User, Comment, Tag } = require('../models');

exports.newPostForm = (req, res) => {
    res.render('newPost', { user: req.user });
};

exports.createPost = async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const post = await Post.create({
            title,
            content,
            UserId: req.user.id
        });
        if (tags) {
            const tagNames = tags.split(',').map(tag => tag.trim());
            const tagInstances = await Promise.all(tagNames.map(name => Tag.findOrCreate({ where: { name } })));
            await post.setTags(tagInstances.map(tagInstance => tagInstance[0]));
        }
        res.redirect(`/posts/${post.id}`);
    } catch (error) {
        res.redirect('/posts/new');
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [User, Tag, { model: Comment, include: [User] }]
        });
        res.render('index', { posts, user: req.user });
    } catch (error) {
        res.redirect('/');
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [User, Tag, { model: Comment, include: [User] }]
        });
        res.render('post', { post, user: req.user });
    } catch (error) {
        res.redirect('/');
    }
};

exports.editPostForm = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post.UserId !== req.user.id) {
            return res.redirect('/');
        }
        const tags = await post.getTags();
        const tagNames = tags.map(tag => tag.name).join(', ');
        res.render('editPost', { post, user: req.user, tagNames });
    } catch (error) {
        res.redirect('/');
    }
};

exports.updatePost = async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const post = await Post.findByPk(req.params.id);
        if (post.UserId !== req.user.id) {
            return res.redirect('/');
        }
        await post.update({ title, content });
        if (tags) {
            const tagNames = tags.split(',').map(tag => tag.trim());
            const tagInstances = await Promise.all(tagNames.map(name => Tag.findOrCreate({ where: { name } })));
            await post.setTags(tagInstances.map(tagInstance => tagInstance[0]));
        }
        res.redirect(`/posts/${post.id}`);
    } catch (error) {
        res.redirect(`/posts/edit/${req.params.id}`);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post.UserId !== req.user.id) {
            return res.redirect('/');
        }
        await post.destroy();
        res.redirect('/');
    } catch (error) {
        res.redirect('/');
    }
};
