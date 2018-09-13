import JWT from 'jsonwebtoken';
import User from '../models/userModel';
import { local } from '../config';

const signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, local.JWT_SECRET);
};

module.exports = {
  signUp: async (req, res, next) => {

    const {email, password} = req.value.body;
    const foundUser = await User.findOne({"local.email": email});

    if (foundUser) {
      return res.status(403).json({error: "Email already in use"});
    }

    const newUser = new User({
      method: 'local',
      local: {
        email,
        password,
      },
    });

    await newUser.save();

    const token = signToken(newUser);

    res.status(200).json({token})
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({token});
  },

  googleOAuth: async(req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({token});
  },

  facebookOAuth: async(req, res, next) => {
    console.log("GOT IT");
  },

  secret: async (req, res, next) => {
    res.json({secret: "resource"})
  }
};