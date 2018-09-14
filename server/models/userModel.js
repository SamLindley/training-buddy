import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'facebook', 'google'],
    required: true
  },
  local: {
    email: {
      type: String,
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
    },
    givenName: String,
    name: String,
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    givenName: String,
    name: String,
  },

});

userSchema.pre('save', async function (next) {
  try {
    if(this.method !== 'local'){
      next();
    }

    const salt = await bcrypt.genSalt(10);
    // this is the User object that we are calling save on
    this.local.password = await bcrypt.hash(this.local.password, salt);
    next();
  } catch (e) {
    console.log("CAUGTH");
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