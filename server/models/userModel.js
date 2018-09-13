import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {AUTH_LOCAL, AUTH_FACEBOOK, AUTH_GOOGLE} from '../config';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  method: {
    type: String,
    enum: [AUTH_LOCAL, AUTH_FACEBOOK, AUTH_GOOGLE],
    required: true
  },
  local: {
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    }
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    }
  },

});

userSchema.pre('save', async function (next) {
  try {
    if(this.method !== AUTH_LOCAL){
      next();
    }

    const salt = await bcrypt.genSalt(10);
    // this is the User object that we are calling save on
    this.local.password = await bcrypt.hash(this.local.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (e) {
    throw new Error(error);
  }
};

const User = mongoose.model('user', userSchema);

module.exports = User;