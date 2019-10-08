const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const keys = require("./keys");
const User = require("../db/models/userModel");

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.image,
        };

        //Check for existing user
        User.findOne({ googleID: profile.id }).then(user => {
          if (user) {
            done(null, user);
          } else {
            User.create(newUser).then(user => {
              done(null, user);
            });
          }
        });
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });
};
