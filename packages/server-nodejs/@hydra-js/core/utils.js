import { readDir } from './fs';
import config from './config';

const { templateDir } = config.CONTEXT;

export function getRoutes() {
  const files = readDir(templateDir);
  const routes = {};
  files.forEach((fileOrDir) => {
    if (!fileOrDir.startsWith('_')) {
      const [path, type] = fileOrDir.split('.');
      // Exclude certain files
      if (!['404'].includes(path)) {
        // Only allowing for `jsx`, `html` file type for now
        if (['jsx', 'html'].includes(type)) {
          const pathNormalized = path
            .split('/')
            .filter((fp) => fp !== 'index')
            .join('/');

          routes[`/${pathNormalized}`] = {
            template: { engine: type, view: path },
            path: `${templateDir}/${path}.${type}`,
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
