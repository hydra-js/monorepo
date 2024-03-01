import { http } from '../utils/http';
import logger from '../utils/logger';

const health = (req, res) => {
  try {
    // @todo: healthcheck() and
    // return notFound() for first time
    // otherwise, return status
    return http(res).notFound();
    // return http(res).ok({});
  } catch (err) {
    logger.error(err);
    http(res).error(err);
  }
  return res.end();
};

export default health;
