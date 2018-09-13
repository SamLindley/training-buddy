import passport from 'passport';
import {Strategy as JwtStrategy} from 'passport-jwt';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import {ExtractJwt} from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';
import FacebookTokenStrategy from 'passport-facebook-token';
import {
  local,
  oauth
} from './config';
import User from './models/userModel';
import configureStore from "../client/src/store";

const {facebook, google} = oauth;

// JSON WEB TOKENS
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader(local.JWT_HEADER),
  secretOrKey: local.JWT_SECRET
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
passport.use(google.AUTH_TOKEN, new GooglePlusTokenStrategy({
  clientID: google.CLIENT_ID,
  clientSecret: google.CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({"google.id": profile.id});
    if (existingUser) {
      console.log("User already exists in our Database");
      return done(null, existingUser);
    }

    console.log("User doesn't exist in our Database, creating new entry");

    const newUser = new User({

      method: google.AUTH_TAG,
      [google.AUTH_TAG]: {
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

passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: facebook.CLIENT_ID,
  clientSecret: facebook.CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accesstokent', accessToken);
    console.log('refreshtoken', refreshToken);
  } catch (e) {
    done(e, false, e.message)
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {

  try {
    const user = await User.findOne({"local.email": email});

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
