const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;
const User = require('./user');
const Tag = require('./tag');
const Comment = require('./comment');

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Post.belongsTo(User);
Post.belongsToMany(Tag, { through: 'PostTags' });
Tag.belongsToMany(Post, { through: 'PostTags' });
Post.hasMany(Comment, { onDelete: 'CASCADE' });

module.exports = Post;
