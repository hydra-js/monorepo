import User from '../models/User';
// import logger from '../utils/logger';
import { http } from '../utils/http';

const logger = console;

// @todo: simplify and remove code duplication in `catch(err) {}` blocks

export default {
  getAll: async (_, res) => {
    try {
      // @todo: remove token from response and sanatize the response further
      // might be able to do in the scheam level
      const users = await User.find({});
      return http(res).ok(users);
    } catch (err) {
      logger.error(err);
      http(res).error(err);
    }
    return res.end();
  },
  getSingle: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      return http(res).ok(user);
    } catch (err) {
      logger.error(err);
      http(res).error(err);
    }
    return res.end();
  },
  post: async (req, res) => {
    try {
      const user = await User.create(req.body);
      return http(res).ok(user);
    } catch (err) {
      logger.error(err);
      http(res).error(err);
    }
    return res.end();
  },
  patch: async (req, res) => {
    try {
      // @todo: populate correct user object to update
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
      );
      // @todo: return updated user
      return http(res).ok(user);
    } catch (err) {
      logger.error(err);
      http(res).error(err);
    }
    return res.end();
  },
  put: (_, res) => res.status(200).json({}),
  delete: async (req, res) => {
    try {
      // @todo: validate request origin and owner (should do in the middleware)
      // do necessory changes in the schema to accomodate
      const user = await User.deleteOne({ _id: req.params.id });
      // @todo: send proper message for delete action
      return http(res).ok(user);
    } catch (err) {
      logger.error(err);
      http(res).error(err);
    }
    return res.end();
  },
};
