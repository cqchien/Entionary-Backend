const passport = require('passport');
const GoogleStrategy = require('passport-google-token').Strategy;
const { google } = require('./config');

passport.use(
  // We must register JS URL in console developer Google. With localhost, we must register http://localhost and http://localhost:5001
  // With passport-google-token we can receive access_token from body of POST req
  // and validate it with GG Auth Server to get data.
  // Data need validation callback to handle profile and move it to the next middleware with done().
  // With passport-google-oauth20, it suit to you to handle login with google in server-side
  // and need callbackURL to validate with GG Auth Server. In Console Developer Google, we must
  // add Auth redirect Url to connect gg with web server. And It like that: http://localhost:5000/auth/login-gg/callback
  new GoogleStrategy(
    {
      clientID: google.clientId,
      clientSecret: google.clientSecret,
      state: true,
    },
    // move {name, email, avatar} to req.user
    (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile) {
          done(null, null);
        }
        const { name, email, picture } = profile._json;
        done(null, {
          name,
          email,
          avatar: picture,
        });
      } catch (error) {
        done(error, null);
      }
    },
  ),
);
