const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')

const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy

const app = express()

app.use(express.json())
app.use(session({
    secret: 'session_secret',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

require('dotenv').config()

// ⭐️ connect mongo and create user database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

const userSchema = new mongoose.Schema({
    provider: String,
    providerID: String,
    email: String,
    name: String,
})

const User = mongoose.model('User', userSchema)

// ⭐️ passport facebook
passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['id', 'email', 'displayName'],
    },
    async function (accessToken, refreshToken, profile, done) {
        let user = await User.findOne({ provider: 'facebook', providerID: profile.id });
        if (!user) {
            user = new User({
                provider: 'facebook',
                providerID: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName || profile.username,
            });
            await user.save();
        }
        return done(null, user);
    }
))

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/')
    })

// ⭐️ passport google
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, done) {
        let user = await User.findOne({ provider: 'google', providerID: profile.id });
        if (!user) {
            user = new User({
                provider: 'google',
                providerID: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName || profile.username,
            });
            await user.save();
        }
        return done(null, user);
    }
))

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/')
    })

// ⭐️ passport github
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
},
    async function (accessToken, refreshToken, profile, done) {
        let user = await User.findOne({ provider: 'github', providerID: profile.id });
        if (!user) {
            user = new User({
                provider: 'github',
                providerID: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName || profile.username,
            });
            await user.save();
        }
        return done(null, user);
    }
))

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    });

// ⭐️ passport
passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
});

// ⭐️ logout
app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// ⭐️ default page
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello, ${req.user.name}`);
    } else {
        res.send('Hello, world');
    }
});

const port = 3000
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
})