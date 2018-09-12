import passport from 'passport';
import {Strategy as JwtStrategy} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';
import {JWT_HEADER, JWT_SECRET} from './config';
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
  } catch(error) {
    done(error, false);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {

  try {
    const user = await User.findOne({email});

    if(!user) {
      return done(null, false);
    }

    const isMatch = await user.isValidPassword(password);

    if(!isMatch) {
      return done(null, false);
    }

    done(null, user);
  } catch (e) {
    done(e, false)
  }


}));
