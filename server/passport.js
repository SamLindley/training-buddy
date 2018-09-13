import passport from 'passport';
import {Strategy as JwtStrategy} from 'passport-jwt';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import {ExtractJwt} from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';
import {
  JWT_HEADER,
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_GOOGLE_TOKEN,
  AUTH_GOOGLE
} from './config';
import User from './models/userModel';

// JSON WEB TOKENS
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader(JWT_HEADER),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// GOOGLE OAUTH STRATEGY
passport.use(AUTH_GOOGLE_TOKEN, new GooglePlusTokenStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({"google.id": profile.id});
    if (existingUser) {
      console.log("User already exists in our Database");
      return done(null, existingUser);
    }

    console.log("User doesn't exist in our Database, creating new entry");

    const newUser = new User({

      method: AUTH_GOOGLE,
      [AUTH_GOOGLE]: {
        id: profile.id,
        email: profile.emails[0].value,
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch(e) {
    done(e, false, e.message)
  }

}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {

  try {
    const user = await User.findOne({email});

    if (!user) {
      return done(null, false);
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return done(null, false);
    }

    done(null, user);
  } catch (e) {
    done(e, false)
  }


}));
