const passport = require('passport');
const GoogleStrategy = require('passport-google-token').Strategy;
const { google } = require('./config');

passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientId,
      clientSecret: google.clientSecret,
    },
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
