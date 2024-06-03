require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/passport'); // Correct import path
const { sequelize, Post, User, Tag, Comment } = require('./models'); // Ensure all models are imported

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash()); // Use flash middleware
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const tagRoutes = require('./routes/tag');

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/tags', tagRoutes);

// Home route
app.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [User, Tag, { model: Comment, include: [User] }]
        });
        res.render('index', { posts, user: req.user });
    } catch (error) {
        res.render('index', { posts: [], user: req.user });
    }
});

// Sync Database and Start Server
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Unable to connect to the database:', err));
