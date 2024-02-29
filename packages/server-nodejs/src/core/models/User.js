const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { HYDRA_JWT_SECRET } = require('../config');

const schema = mongoose.Schema(
  {
    name: {
      screen_name: { type: String, required: [true, 'required'] },
      first_name: String,
      last_name: String,
    },
    handler: {
      type: String,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      // required: [true, 'required']
      index: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'required!'],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'required!'],
      minLength: 8,
      maxLength: 13,
    },
    bio: String,
    image: String,
    role: {
      type: Number,
      default: 9,
    },
    salt: String,
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

schema.plugin(uniqueValidator, { message: 'is already taken.' });

schema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    try {
      this.setPassword(user.password);
    } catch (err) {
      return next(err);
    }
  }
  return next();
});

schema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

schema.methods.validPassword = function (password) {
  const hashedPassword = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.password === hashedPassword;
};

schema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      handler: this.handler,
      // eslint-disable-next-line radix
      exp: parseInt(exp.getTime() / 1000),
    },
    HYDRA_JWT_SECRET,
  );
};

schema.methods.toJSON = function () {
  return {
    id: this._id,
    name: this.name,
    handler: this.handler,
    email: this.email,
    bio: this.bio,
    image: this.image,
    role: this.role,
    status: this.status,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('User', schema);
