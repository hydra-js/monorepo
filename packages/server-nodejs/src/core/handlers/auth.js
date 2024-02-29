const pick = require('lodash/pick');

const User = require('../models/User');
const { http } = require('../utils/http');
const logger = require('../utils/logger');

const $user = (req) => pick(req.body, ['screen_name', 'email', 'password']);

module.exports = {
  register: async (req, res) => {
    const user = $user(req);
    try {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) return http(res).badRequest('User already exist!');

      const newUser = new User({
        name: { screen_name: user.screen_name },
        email: user.email,
        password: user.password,
      });
      return http(res).ok(await newUser.save());
    } catch (err) {
      logger.error(err);
      http(res).error(err);
    }
    return res.end();
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user) return http(res).unauthorized('User does not exist');

      const isValidPassword = user.validPassword(password);
      if (!isValidPassword)
        return http(res).unauthorized(
          'Invalid email or password. Please try again with the correct credentials.',
        );

      const cookieOptions = {
        maxAge: 20 * 60 * 1000, // would expire in 20minutes
        httpOnly: true, // The cookie is only accessible by the web server
        secure: true,
        sameSite: 'None',
      };
      res.cookie('SessionID', user.token, cookieOptions);
      return http(res).ok(user);
    } catch (err) {
      logger.error(err);
      http(res).error(err);
    }
    return res.end();
  },
};
