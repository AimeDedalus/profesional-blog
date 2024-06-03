// controllers/tagController.js
const { Tag } = require('../models');

// Add a tag
exports.addTag = async (req, res) => {
    const { name } = req.body;
    try {
        await Tag.create({ name });
        res.redirect('/tags');
    } catch (error) {
        res.redirect('/tags');
    }
};

// Display edit tag form
exports.editTagForm = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        res.render('editTag', { tag });
    } catch (error) {
        res.redirect('/tags');
    }
};

// Update tag
exports.updateTag = async (req, res) => {
    const { name } = req.body;
    try {
        const tag = await Tag.findByPk(req.params.id);
        await tag.update({ name });
        res.redirect('/tags');
    } catch (error) {
        res.redirect(`/tags/edit/${req.params.id}`);
    }
};

// Delete tag
exports.deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        await tag.destroy();
        res.redirect('/tags');
    } catch (error) {
        res.redirect('/tags');
    }
};
