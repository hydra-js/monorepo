import path from 'node:path';
import fs from 'node:fs';

function noDotFiles(x) {
  return x[0] !== '.';
}

function readDir(root, filter, files, prefix) {
  prefix = prefix || '';
  files = files || [];
  filter = filter || noDotFiles;

  var dir = path.join(root, prefix);
  if (!fs.existsSync(dir)) return files;
  if (fs.statSync(dir).isDirectory())
    fs.readdirSync(dir)
      .filter(function (name, index) {
        return filter(name, index, dir);
      })
      .forEach(function (name) {
        readDir(root, filter, files, path.join(prefix, name));
      });
  else files.push(prefix);

  return files;
}

export function getRoutes(templatePath) {
  const files = readDir(templatePath);
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
            path: `${templatePath}/${path}.${type}`,
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
