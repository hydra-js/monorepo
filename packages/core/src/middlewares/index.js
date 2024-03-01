const logger = require('../utils/logger');

export const authUser =
  (...roles) =>
  // eslint-disable-next-line arrow-body-style
  (req, res, next) => {
    // @todo: add middleware logic based on user roles
    logger.log(roles);
    return next();
  };
