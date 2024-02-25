const User = require('../models/User');
const logger = require('../logger');
const { http } = require('../utils/http');

module.exports = {
  getAll: async (_, res) => {
    try {
      // @todo: remove token from response and sanatize the response further
      // might be able to do in the scheam level
      const users = await User.find({});
      http(res).ok(users);
    } catch (err) {
      logger.error(err);
      http(res).error(undefined, err);
    }
  },
  getSingle: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      http(res).ok(user);
    } catch (err) {
      logger.error(err);
      http(res).error(undefined, err);
    }
  },
  post: async (req, res) => {
    try {
      const user = await User.create(req.body);
      http(res).ok(user);
    } catch (err) {
      logger.error(err);
      http(res).error(undefined, err);
    }
  },
  patch: async (req, res) => {
    try {
      // @todo: populate correct user object to update
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
      );
      // @todo: return updated user
      http(res).ok(user);
    } catch (err) {
      logger.error(err);
      http(res).error(undefined, err);
    }
  },
  delete: async (req, res) => {
    try {
      // @todo: validate request origin and owner (should do in the middleware)
      // do necessory changes in the schema to accomodate
      const user = await User.deleteOne({ _id: req.params.id });
      // @todo: send proper message for delete action
      http(res).ok(user);
    } catch (err) {
      logger.error(err);
      http(res).error(undefined, err);
    }
  },
};
