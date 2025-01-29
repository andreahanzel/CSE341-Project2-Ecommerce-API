import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { initDb } from './config/database.js';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GitHubStrategy } from 'passport-github2';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Updated session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    },
    name: 'sessionId'
  })
);

app.use(passport.initialize());
app.use(passport.session());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, OPTIONS, DELETE'
  );
  next();
});

// GitHub strategy configuration
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('GitHub Strategy Callback:', {
        profileId: profile.id,
        username: profile.username
      });
      const user = {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        provider: 'github'
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Debug middleware
app.use((req, res, next) => {
  console.log('Session:', {
    isAuthenticated: req.isAuthenticated?.(),
    sessionID: req.sessionID,
    user: req.user?.username
  });
  next();
});

// Debug route
app.get('/debug-session', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
    session: req.session
  });
});

// Root route
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Logged in as ${req.user.username || req.user.displayName}`);
  } else {
    res.send('Logged out');
  }
});

// Auth status route
app.get('/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: req.user
    });
  } else {
    res.json({
      authenticated: false
    });
  }
});

// GitHub callback route
app.get(
  '/github/callback',
  (req, res, next) => {
    console.log('Entering callback route');
    next();
  },
  passport.authenticate('github', { 
    failureRedirect: '/api-docs',
    session: true
  }),
  (req, res) => {
    console.log('Authentication successful', {
      user: req.user?.username
    });
    res.redirect('/');
  }
);

// Logout route
app.get('/logout', (req, res, next) => {
  console.log('Logging out user:', req.user?.username);
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destruction error:', err);
        return next(err);
      }
      res.redirect('/');
    });
  });
});

// Use router for all routes
app.use('/', router);

// Error handling middleware
app.use(errorHandler);

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
