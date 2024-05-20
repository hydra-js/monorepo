import path from 'node:path';
import fs from 'node:fs';

import { readDir } from './fs';
import config from './config';

const { __templatedir, __apidir } = config;

export function getRoutes() {
  const files = readDir(__templatedir);
  const routes = {};
  files.forEach((fileOrDir) => {
    if (!fileOrDir.startsWith('_')) {
      const [filePath, type] = fileOrDir.split('.');
      // Exclude certain files
      if (!['404'].includes(filePath)) {
        // Only allowing for `jsx`, `html` file type for now
        if (['jsx', 'html'].includes(type)) {
          const pathNormalized = filePath
            .split('/')
            .filter((fp) => fp !== 'index')
            .join('/');

          routes[`/${pathNormalized}`] = {
            template: { engine: type, view: filePath },
            path: `${__templatedir}/${filePath}.${type}`,
          };
        }
      }
    }
  });
  return routes;
}

// Normalize port into a number, string, or false.
export function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
}

export function getApiHandler(req) {
  const { url, method } = req;
  const urlPath = url.split('/').filter((p) => p !== '');
  urlPath.push(`${method.toLowerCase()}.js`);
  const filePath = path.join(__apidir, ...urlPath);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  return fs.existsSync(filePath) ? require(filePath).default : null;
}

export function isValidMongoUrl(url) {
  return (
    url &&
    /^(mongodb:(?:\/{2})?)((\w+?):(\w+?)@|:?@?)(\w+?)(:(\d+))?\/(\w+?)$/.test(
      url,
    )
  );
}
