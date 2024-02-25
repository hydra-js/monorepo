const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { HYDRA_JWT_SECRET } = require('../config');

const schema = mongoose.Schema(
  {
    name: {
      screenName: String,
      firstName: String,
      lastName: String,
    },
    handler: {
      type: String,
      lowercase: true,
      required: [true, 'required!'],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
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
    password: String,
    bio: String,
    image: String,
    role: {
      type: Number,
      default: 9,
    },
    salt: String,
    status: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true },
);

schema.plugin(uniqueValidator, { message: 'is already taken.' });

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
    _id: this._id,
    handler: this.handler,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image,
  };
};

module.exports = mongoose.model('User', schema);
